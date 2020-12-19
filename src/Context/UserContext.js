import React from 'react';

export const UserContext = React.createContext();

const BASE_URL = 'http://127.0.0.1:8000';

function UserContextProvider(props) {
    const [auth, setAuth] = React.useState({
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null
    })

    const [resetOk, setResetOk] = React.useState(false);
    const [isRegistered, setRegistered] = React.useState(false)
    const [loginMessage, setLoginMessage] = React.useState('');    // for showing 'invalid credentials' message when needed

    //to show errors while signing up
    const [signupErrorMessage, setSignupErrorMessage] = React.useState('');

    const [emailMessage, setEmailMessage] = React.useState('');  
    const [displayNameMessage, setDisplyNameMessage] = React.useState('');
    const [passwordMessage, setPasswordMessage] = React.useState('');
    const [confirmpasswordMessage, setConfirmPasswordMessage] = React.useState('');

    async function login(loginCred) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCred)
        }
        await fetch(`${BASE_URL}/api/account/login`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('response data == ', data);
                if ('token' in data){
                    setAuth(prev => ({ ...prev, isAuthenticated: true, token: data.token }));
                    localStorage.setItem('token', data.token);
                }
                else{
                    console.log('Errorrrr:: ', data)
                    setLoginMessage('Oops, invalid credentials!');
                }
            }).catch(err => {
                console.log('Error from catch , ', err);
                // setAuth(prev => ({ ...prev, isAuthenticated: false }));

            })
    }
    async function registerUser(user_info) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_info)
        }
        fetch(`${BASE_URL}/api/account/register`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('Register user response === ', typeof data ,data);
                if (data.response === "successfully registered new user."){
                setRegistered(!isRegistered);
                }
                else{
                    console.log('Not signed uop, ', data.email)
                    if(data.email != undefined){
                        setSignupErrorMessage('Email error');
                        console.log('hardcoded: ', data.response.email);
                        console.log('Not hard coded: ', signupErrorMessage);
                    }
                }

            }).catch(err => {
                //console.log(err);
            })
    }
    function sendForReset(resetContent){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(resetContent)
        }
    
        fetch('http://127.0.0.1:8000/api/account/password_resetconfirm/', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setResetOk(true);
            })
            .catch(err => console.log(err))
        
    }

    

    const logout = () => {
        localStorage.clear();
        setAuth({
            isAuthenticated: false,
            isLoading: false,
            token: null,
            user: null
        });

    }

    return (

        <UserContext.Provider value={{
            auth,
            setAuth,
            registerUser,
            login,
            logout,
            isRegistered,
            loginMessage,
            setLoginMessage,
            sendForReset,
            resetOk,
            emailMessage,
            displayNameMessage,
            passwordMessage,
            confirmpasswordMessage,
            signupErrorMessage
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;