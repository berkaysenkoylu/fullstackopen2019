import React from 'react';

const Anecdote = (props) => {

    const onVoteHandler = () => {
        props.voted(props.id, props.content);
    }

    return (
        <div>
            <div>
                {props.content}
            </div>
            <div>
                has {props.votes}
                <button onClick={onVoteHandler}>vote</button>
            </div>
        </div>
    );
}

export default Anecdote;
