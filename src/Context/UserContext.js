import React from 'react';

export const UserContext =  React.createContext();

const BASE_URL = 'http://127.0.0.1:8000';

function UserContextProvider(props) {
    const [auth, setAuth] = React.useState({
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null
    })

    const [isRegistered, setRegistered] = React.useState(false)



    async function login(loginCred){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCred) 
        }
        await fetch(`${BASE_URL}/api/account/login`, requestOptions)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                setAuth({...auth, isAuthenticated: true, token:localStorage.getItem('token')})
                console.log(auth);
            }).catch(err => {
                console.log(err);
            })
    }
    async function registerUser(user_info){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_info) 
        }
        fetch(`${BASE_URL}/api/account/register`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRegistered(!isRegistered);
            }).catch(err => {
                //console.log(err);
            })
    }

    return (
        
        <UserContext.Provider value={{auth, setAuth, registerUser, login, isRegistered}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;