import React, { useState, useEffect, useCallback } from 'react';
import LoginForm from './widgets/LoginForm';
import apiFetch from './utils/apiFetch';

const Auth = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const onLogin = (username, password) => {
        apiFetch('api-token-auth/', {username: username, password: password}).then(j => console.log(j));
    };

    if (!loggedIn) {
        return (<LoginForm onLogin={onLogin} />);
    }


    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default Auth;