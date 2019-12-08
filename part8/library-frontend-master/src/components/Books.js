import React, { useState, useEffect } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Filter from './Filter';

const GET_BOOKS = gql`
query FindBookByGenre($genre: String!) {
  allBooks(genre: $genre){
    title
    author {
      name
    }
    published
    genres
  }
}
`;

const Books = (props) => {
  // This is all the books residing in the database, I use it to flatten
  // the total genre array so that I can dynamically produce buttons 
  // for all the genres (unique) present in the database. 
  const [books, setBooks] = useState([]);

  // This is the filtered book list by the genre, which is populated 
  // thanks to the mutation defined above
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState('all genres');

  const client = useApolloClient();

  useEffect(() => {
    if(!props.bookListData.loading) {
      setBooks([...props.bookListData.data.allBooks]);
      setFilteredBooks([...props.bookListData.data.allBooks]);
    }
      
  }, [props.bookListData]);

  if (!props.show) {
    return null;
  }

  if(props.bookListData.loading) {
    return <div>Loading...</div>;
  }

  let genreOptions = [];
  if(books.length > 0) {
    books.forEach(book => {
      genreOptions = genreOptions.concat(book.genres);
    });
    genreOptions = [...new Set(genreOptions)];
  }

  const onGenreSelectionHandler = async (genreName) => {
    setFilteredGenre(genreName);

    if(genreName !== 'all genres'){
      const { data } = await client.query({
        query: GET_BOOKS,
        variables: { genre: genreName },
        fetchPolicy: 'no-cache'
      });

      setFilteredBooks(data.allBooks);
    }
    else {
      setFilteredBooks(books);
    }
  }

  // const { data } = await client.query({
  //   query: FIND_PERSON,
  //   variables: { nameToSearch: name }
  // })

  let bookListContent = [];
  bookListContent = filteredBooks.map(filteredBook => {
    return (<tr key={filteredBook.title + Math.random(0, 1)*213123}>
      <td>{filteredBook.title}</td>
      <td>{filteredBook.author.name}</td>
      <td>{filteredBook.published}</td>
    </tr>);
  })
  // if(filteredGenre === 'all genres') {
  //   bookListContent = books.map(a =>
  //     <tr key={a.title + Math.random(0, 1)*213123}>
  //       <td>{a.title}</td>
  //       <td>{a.author.name}</td>
  //       <td>{a.published}</td>
  //     </tr>
  //   );
  // } else {
  //   bookListContent = books.filter(book => book.genres.includes(filteredGenre) ? book : null).map(filteredBook => {
  //     return (<tr key={filteredBook.title + Math.random(0, 1)*213123}>
  //       <td>{filteredBook.title}</td>
  //       <td>{filteredBook.author.name}</td>
  //       <td>{filteredBook.published}</td>
  //     </tr>);
  //   })
  // }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{filteredGenre ? filteredGenre : null}</strong></p>
      <Filter allGenreOptions={genreOptions} selectedGenre={onGenreSelectionHandler} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookListContent}
        </tbody>
      </table>
    </div>
  )
}

export default Books