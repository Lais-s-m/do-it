import React, {useEffect, useState} from 'react';

import { Route, Switch } from 'react-router';

import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

function Routes () {
    const [ authenticated, setAuthenticated ] = useState(false);

    useEffect(()=> {
        const token = JSON.parse(localStorage.getItem("@Doit:token"));
        if (token){
            return setAuthenticated(true);
        }
    }, [authenticated])
    return (
        <Switch>
            <Route exact path="/">
                <Home
                    authenticated={authenticated}
                />
            </Route>
            <Route exact path="/signup">
                <Signup
                     authenticated={authenticated}
                     setAuthenticated = {setAuthenticated}
                />
            </Route>
            <Route exact path="/login">
                <Login
                     authenticated={authenticated}
                     setAuthenticated={setAuthenticated}
                />
            </Route>
            <Route exact path="/dashboard">
                <Dashboard
                     authenticated={authenticated}
                />
            </Route>
        </Switch>
    )
}

export default Routes;