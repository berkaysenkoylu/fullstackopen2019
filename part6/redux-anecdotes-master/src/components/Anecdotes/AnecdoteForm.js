import React from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {

    const submitForm = async (event) => {
        event.preventDefault();

        props.onCreateAnecdote(event.target.content.value);
        event.target.content.value = '';
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => submitForm(event)}>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAnecdote: (data) => dispatch(createAnecdote(data))
    };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);