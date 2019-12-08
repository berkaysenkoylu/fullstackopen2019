import React, { useState } from 'react';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [favoriteGenre, setFavoriteGenre] = useState('');

    if (!props.show) {
        return null
    }

    const onSignupSubmit = async (event) => {
        event.preventDefault();

        await props.onSignup({ variables: { username, favoriteGenre }});

        setUsername('');
        setFavoriteGenre('');
    }

    return (
        <form onSubmit={onSignupSubmit}>
            <div>
                username
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                favorite genre
                <input value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)} />
            </div>
            <button>Signup</button>
        </form>
    )
}

export default Signup;
