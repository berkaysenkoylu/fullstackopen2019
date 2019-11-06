import React from 'react';
import { connect } from 'react-redux';

import { vote } from '../../reducers/anecdoteReducer';
import { createNotification } from '../../reducers/notificationReducer';
import Anecdote from './Anecdote';
import Filter from '../../components/Filter/Filter';

const AnecdoteList = (props) => {
    let anecdotes = props.visibleAnecdotes;
    
    const onVotedHandler = (id, content) => {
        props.onVoted(id);
        props.onCreateNotification(`you voted '${content}'`, 3);
        // setTimeout(() => {
        //     props.onCreateNotification('');
        // }, 5000);
    }

    let anecdoteContent;
    anecdoteContent = anecdotes.map(anecdote => {
        return <Anecdote key={anecdote.id} id={anecdote.id} content={anecdote.content} votes={anecdote.votes} voted={onVotedHandler} />
    });

    return (
        <div style={{marginTop: '30px'}}>
            <Filter />
            {anecdoteContent}
        </div>
    );
}

// Function to filter the contents
const anecdotesToShow = ({anecdotes, filters}) => {
    return anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)).filter(anecdote => anecdote.content.toLowerCase().includes(filters.filter.toLowerCase()));
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onVoted: (id) => dispatch(vote(id)),
        onCreateNotification: (message, duration) => dispatch(createNotification(message, duration))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);