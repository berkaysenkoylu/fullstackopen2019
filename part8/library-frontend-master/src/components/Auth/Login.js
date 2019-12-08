import React, { useState } from 'react';

const Login = (props) => {
    const [username, setUsername] = useState('');
    if (!props.show) {
        return null
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        await props.onLogin({ variables: { username: username, password: 'password' } });

        setUsername('');
    }

    return (
        <form onSubmit={onLoginSubmit}>
            <div>
                username
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <button>Login</button>
        </form>
    )
}

export default Login;