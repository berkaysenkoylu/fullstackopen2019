import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom';

import { 
  Container, 
  Table, 
  Form, 
  Button,
  Message,
  Menu } from 'semantic-ui-react';

const Navigation = (props) => {
  const [activeItem, setActiveItem] = useState('anecdotes')

  const onClickHandler = (e, {name}) => {
    switch(name) {
      case 'anecdotes':
        setActiveItem('anecdotes');
        props.history.push('/');
        break;
      case 'create':
        setActiveItem('create');
        props.history.push('/create');
        break;
      case 'about':
        setActiveItem('about');
        props.history.push('/about');
        break;
      default:
        break;
    }
  }

  return (
    <Menu inverted>
      <Menu.Item 
        link 
        name="anecdotes" 
        active={activeItem === 'anecdotes'}
        onClick={onClickHandler}>
        {/* <Link to="/">anecdotes</Link> */}
      </Menu.Item>
      <Menu.Item 
        link
        name="create"
        active={activeItem === 'create'}
        onClick={onClickHandler}>
        {/* <Link to="/create">create new</Link> */}
      </Menu.Item>
      <Menu.Item 
        link
        name="about"
        active={activeItem === 'about'}
        onClick={onClickHandler}>
        {/* <Link to="/about">about</Link> */}
      </Menu.Item>
    </Menu>
  )
}

const NewNavigation = withRouter(Navigation);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
              <Table.Cell>
                <Link to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {anecdote.author}
              </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <Link to="">{anecdote.info}</Link></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content,
      author,
      info,
      votes: 0
    });

    props.history.push("/");
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Content</label>
          <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Author</label>
          <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Url for more info</label>
          <input type="text" name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </Form.Field>

        <Button type="submit">create</Button>
      </Form>
    </div>
  )

}

const CreateNewWithRouter = withRouter(CreateNew)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <Container>
        <NewNavigation />
        <h1>Software anecdotes</h1>
        {notification ? <Message success>{notification}</Message> : ''}
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />} />
        <Route path="/create" render={() => <CreateNewWithRouter addNew={addNew} />} />
        <Route path="/about" component={About} />
        <Footer />
      </Container>
    </Router>
  )
}

export default App;

// WITH REACT BOOTSTRAP
/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom';

import { 
  Table, 
  Form, 
  Button, 
  FormLabel, 
  FormControl, 
  Alert,
  Navbar, 
  Nav } from 'react-bootstrap';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">anecdotes</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/create">create new</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/about">about</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <div>
    //   <Link to="/" style={padding}>anecdotes</Link>
    //   <Link to="/create" style={padding}>create new</Link>
    //   <Link to="/about" style={padding}>about</Link>
    // </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
              <td>
                <Link to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content}
                </Link>
              </td>
              <td>
                {anecdote.author}
              </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <Link to="">{anecdote.info}</Link></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content,
      author,
      info,
      votes: 0
    });

    props.history.push("/");
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <FormLabel>Content</FormLabel>
          <FormControl type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />

          <FormLabel>Author</FormLabel>
          <FormControl type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

          <FormLabel>Url for more info</FormLabel>
          <FormControl type="text" name="info" value={info} onChange={(e) => setInfo(e.target.value)} />

          <Button variant="primary" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

const CreateNewWithRouter = withRouter(CreateNew)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div class="container">
        <Menu />
        <h1>Software anecdotes</h1>
        {notification ? <Alert variant="success">{notification}</Alert> : ''}
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />} />
        <Route path="/create" render={() => <CreateNewWithRouter addNew={addNew} />} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
*/