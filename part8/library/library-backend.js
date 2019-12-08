const mongoose = require('mongoose');
const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const MONGODB_URI = "mongodb+srv://berkay_admin:bIqBESAOrU4pTg96@projects-1orr9.mongodb.net/library?retryWrites=true&w=majority";

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Database Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to database!");
}).catch(() => {
  console.log("Failed to connect to database!");
});

const JWT_SECRET = 'Graphql_section';

const pubsub = new PubSub();

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type LoggedInUser {
    token: Token!
    userInfo: User!
  }

  type Misc {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ) : Author
    deleteAllAuthors(
      gibb: String!
    ) : Misc
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    editBook(
      title: String!
      genres: [String!]!
    ) : Book
    deleteAllBooks(
      gibberish: String
    ) : Misc
    addUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ) : LoggedInUser
  }
`

const resolvers = {
  Query: {
    allAuthors: async () => {
      const authors = await Author.find();

      return authors.map(author => {
        return {
          ...author._doc,
          bookCount: author.books.length
        }
      });
    },
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.genre) {
        return Book.find().populate('author');
      }
      else {
        const books = await Book.find().populate('author');
        
        return books.filter(book => book.genres.includes(args.genre) ? book : null);
      }
    },
    bookCount: () => Book.collection.countDocuments(),
    allUsers: () => User.find(),
    me: (root, args, context) => { return context.currentUser }
  },
  // Author: {
  //   bookCount: async (root) => {
  //     // const books = await Book.find().populate('author');

  //     // return books.filter(book => book.author.name === root.name).length;
  //   }
  // },
  Mutation: {
    deleteAllAuthors: async (root, args) => {
      await Author.deleteMany();
      return {value: "purged"};
    },
    deleteAllBooks: async (root, args) => {
      await Book.deleteMany();
      return {value: 'Deleted'};
    },
    addAuthor: async (root, args) => {
      const author = new Author({...args, books: []});

      try {
        await author.save();
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      
      return author;
    },
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if(!currentUser) {
        throw new AuthenticationError("Not authenticated");  
      }

      if(!author) {
        throw new UserInputError("The author couldn't be found in the DB, you must add the Author first!");
      }

      const book = new Book({ ...args, author: author._id });

      try {
        const savedBook = await book.save();

        const newAuthor = {
          name: author.name,
          born: author.born,
          books: [...author.books, savedBook._id]
        };

        await Author.updateOne({ _id: author._id }, newAuthor);
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      
      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      // const currentUser = context.currentUser;

      // if(!currentUser) {
      //   throw new AuthenticationError("Not authenticated");
      // }

      try {
        author.born = args.setBornTo;
        await author.save();
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      
      return {...author._doc, bookCount: author.books.length};
    },
    editBook: async (root, args) => {
      const book = await Book.findOne({ title: args.title }).populate('author');

      book.genres = args.genres;

      return book.save();
    },
    addUser: async (root, args) => {
      const newUser = new User({...args});

      try {
        await newUser.save();
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if ( !user || args.password !== 'password' ) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      const loggedinuser = {
        token: { value: jwt.sign(userForToken, JWT_SECRET) },
        userInfo: user
      }

      return loggedinuser;
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
})


/*

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


*/