import React, { useState, useEffect } from 'react'

const Authors = (props) => {
  const [authorList, setauthorList] = useState([]);
  const [author, setAuthor] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Set the list of author
  useEffect(() => {
    if(!props.authorListData.loading)
      setauthorList([...props.authorListData.data.allAuthors]);
  }, [props.authorListData]);

  // Set the initial selected author
  useEffect(() => {
    if(!props.authorListData.loading) {
      const selectedAuthor = props.authorListData.data.allAuthors[0];
      if(selectedAuthor)
        setAuthor(selectedAuthor.name);
    }
  }, [props.authorListData])

  if (!props.show) {
    return null
  }

  // let authors = [];
  // if(props.authorListData.loading) {
  //   return <div>Loading...</div>
  // }
  // else {
  //   authors = [...props.authorListData.data.allAuthors];
  // }

  const onSubmitBirthYear = async (event) => {
    event.preventDefault();

    await props.updateAuthorBirthYear({
      variables: { name: author, setBornTo: parseInt(birthYear) }
    });

    setAuthor('');
    setBirthYear('');
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorList.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

     {authorList.length > 0 && props.isAuth ? ( <div><h2>Set birthyear</h2>
      <form onSubmit={onSubmitBirthYear}>
        <div>
          name
          <select onChange={(e) => setAuthor(e.target.value)} value={author}>
            {authorList.map((author, index) => index !== 0 ? <option key={author.name} value={author.name}>{author.name}</option> : <option defaultValue key={author.name} value={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input value={birthYear} onChange={(event) => setBirthYear(event.target.value)} />
        </div>
        <button>update author</button>
      </form></div>) : null}
    </div>
  )
}

export default Authors