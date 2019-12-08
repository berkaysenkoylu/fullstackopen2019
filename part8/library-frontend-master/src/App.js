import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
  }
`;

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`;

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`;

const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook (
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      genres
      id
    }
  }
`;

const SET_AUTHOR_BIRTHYEAR = gql`
  mutation setAuthorBirth($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      token {
        value
      }
      userInfo {
        username
        favoriteGenre
      }
    }
  }
`;

const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $favoriteGenre: String!) {
    addUser(
      username: $username
      favoriteGenre: $favoriteGenre
    ) {
      username
      favoriteGenre
      id
    }
  }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');
  const [favGenre, setFavGenre] = useState('');
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      });
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify(`A new book of name: ${subscriptionData.data.bookAdded.title} has been added`);
      // console.log(subscriptionData)
      updateCacheWith(subscriptionData.data.bookAdded);
    }
  });

  const getAllAuthors = useQuery(ALL_AUTHORS);

  const getAllBooks = useQuery(ALL_BOOKS);

  const getCurrUser = useQuery(ME);
//refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
// update: (store, response) => {
//   const dataResidingInStore = store.readQuery({ query: ALL_BOOKS });
//   dataResidingInStore.allBooks.push(response.data.addBook);
//   store.writeQuery({
//     query: ALL_BOOKS,
//     data: dataResidingInStore
//   });
// }
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });

  const [editAuthor] = useMutation(SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: handleError
  });

  const [login] = useMutation(LOGIN_USER, {
    onError: handleError
  });

  const [signup] = useMutation(SIGNUP_USER, {
    onError: handleError
  });

  const onLoginHandler = async (inputVars, login) => {
    const response = await login({ ...inputVars });

    localStorage.setItem('userToken', response.data.login.token.value);
    setFavGenre(response.data.login.userInfo.favoriteGenre)
    setToken(response.data.login.token.value);
  }

  const onLogoutHandler = () => {
    setToken('');
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? 
          <>
            <button onClick={() => setPage('login')}>login</button>
            <button onClick={() => setPage('signup')}>signup</button>
          </> : <>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={onLogoutHandler}>Logout</button></>}
      </div>

      {errorMessage !== null ? <div style={{color: 'red'}}>{errorMessage}</div> : null}

      <Authors
        show={page === 'authors'}
        authorListData={getAllAuthors}
        updateAuthorBirthYear={editAuthor}
        isAuth={token}
      />

      <Books
        show={page === 'books'}
        bookListData={getAllBooks}
      />

      <Recommend
        show={page === 'recommend'}
        bookListData={getAllBooks}
        userData={getCurrUser}
        favoriteGenre={favGenre}
      />

      <NewBook
        show={page === 'add'}
        createBook={addBook}
      />

      <Login show={page === 'login'} onLogin={(inputVars) => onLoginHandler(inputVars, login)} />

      <Signup show={page === 'signup'} onSignup={signup} />
    </div>
  )
}

export default App