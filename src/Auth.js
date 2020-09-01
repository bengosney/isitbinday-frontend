import React, { useState } from 'react';
import LoginForm from './widgets/LoginForm';
import useFetch from './hooks/useFetch';

const Auth = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loggedIn) {
        return (<LoginForm onLogin={(username, password) => {
            useFetch('api-auth/', {username: username, password: password});
        }} />);
    }


    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default Auth;