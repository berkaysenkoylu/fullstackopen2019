import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Notification from './components/Notification';
import AnecdoteList from './components/Anecdotes/AnecdoteList';
import AnecdoteForm from './components/Anecdotes/AnecdoteForm';

import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {

  useEffect(() => {
    props.onInitializeAnecdotes();
  }, [props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitializeAnecdotes: () => dispatch(initializeAnecdotes())
  }
}

export default connect(null, mapDispatchToProps)(App);