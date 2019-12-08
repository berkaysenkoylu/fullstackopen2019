import React, { useState, useEffect } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_BOOKS = gql`
query FindBookByGenre($genre: String!) {
  allBooks(genre: $genre){
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

const Recommend = (props) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    const client = useApolloClient();

    useEffect(() => {
        async function fetchData() {
            if(true) {
                const { data } = await client.query({
                    query: GET_BOOKS,
                    variables: { genre: props.favoriteGenre },
                    fetchPolicy: 'no-cache'
                });
                setRecommendedBooks([...data.allBooks])
            }
        }
        fetchData();
    }, [client, props.userData, props.favoriteGenre]);

    if (!props.show) {
        return null;
    }


    let bookListContent = recommendedBooks.map(book => {
        return (<tr key={book.title + Math.random(0, 1)*213123}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
        </tr>)
    });

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite geenre <strong>{props.favoriteGenre}</strong> </p>
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

export default Recommend;
