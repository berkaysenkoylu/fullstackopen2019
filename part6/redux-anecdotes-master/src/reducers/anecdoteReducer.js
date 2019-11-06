// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

import anecdoteService from '../services/anecdotes';

const initialState = [];

export const initializeAnecdotes = (data) => {
  return async dispatch => {
    const data = await anecdoteService.getAll();

    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: data
    });
  }
}

export const vote = (id) => {
  return async dispatch => {
    const data = await anecdoteService.voteAnecdote(id);

    dispatch({
      type: 'VOTE',
      data: data
    });
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = {
      content: content,
      votes: 0
    };

    const anecdoteBody = await anecdoteService.createAnecdote(data);
    
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: anecdoteBody
    });
  }
}

const reducer = (state = initialState, action) => {
  
  switch(action.type) {
    case 'VOTE':
      const copiedState = [...state];
      state = copiedState.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data);
      break;
    case 'CREATE_ANECDOTE':
      const newAnecdote = { ...action.data };
      state = state.concat(newAnecdote);
      break;
    case 'INITIALIZE_ANECDOTES':
      state = action.data;
      break;
    default: 
      break;
  }

  return state;
}

export default reducer;