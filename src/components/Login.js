import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {UserContext} from '../Context/UserContext';

const { Button, Grid, Typography, TextField, Avatar } = require("@material-ui/core");
const { Redirect } = require("react-router-dom");


const theme = createMuiTheme({
    typography:{
      h3: {
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 15
      },
      subtitle2: {
        color: 'gray',
        marginBottom:15
      },
      subtitle1: {
        fontWeight: 'bold',
        marginBottom: 10
        }
    }
    
})


const Login = () => {
    const [loginCred, setLoginCred] = React.useState({
        username: null,
        password: null
    })

    const {auth, setAuth, login, isRegistered, loginMessage} = React.useContext(UserContext);
    // const [loginMessage, setLoginMessage] = React.useState('');    // for showing 'invalid credentials' message when needed

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            // console.log('Found token ==> ', token)
            setAuth(prev => ({ ...prev, isAuthenticated: true, token: token }));
        }
        console.log('This is login page ', loginMessage)
    }, []);

    if (auth.isAuthenticated){
        return <Redirect to='/home' />
    }
    
    const handleChange = (e) => {
        setLoginCred(prev => ({...prev, [e.target.id]:e.target.value}));
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('from handlelogin=== ',e );
        login(loginCred);
    }
    return(
        <ThemeProvider theme={theme}>
        <div>
            <Grid container style={{padding:'15vw'}} spacing={4}>
                <Grid item xs={1}>
                    <Avatar src='/Feeds-Green-icon.png' />
                </Grid>
                <Grid item container xs={7} direction='column'>
                    <Grid item>
                        <Typography variant='h3'>Welcome to RSS Feed Reader</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            Keep up with the topics and trends you care about, without the overwhelm
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={4} direction='column'>
                    {isRegistered? <Typography variant='subtitle2' style={{backgroundColor: 'lightgreen', color:"black"}} >Succesfully Registered</Typography> : <div />}
                    <Typography variant='subtitle1'>Login to your Account</Typography>
                    <form onSubmit={handleLogin}>
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Email'
                        type='email'
                        placeholder='test@test.com'
                        style={{marginBottom:15}}
                        id='username'
                        onChange={handleChange}
                    />
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Password'
                        type='password'
                        style={{marginBottom:15}}
                        id='password'
                        onChange={handleChange}
                    />
                    <br />
                        {loginMessage.length>0 ? 
                            <div>
                            <span style={{color:"red"}}>
                                {loginMessage}
                            </span>
                            <br />
                            <br />
                                </div>
                            : <div></div>
                        }


                    <Button type='submit' variant='filled' style={{color: 'white', backgroundColor:'green', marginBottom:15}}> 
                        Log In 
                    </Button>
                    </form>
                    <a href='/send_email'>
                        <Typography variant='subtitle2'>Forgot your Password?</Typography>
                    </a>
                    <a href='/register'>
                        <Typography variant='subtitle2'>Don't have an Account yet?</Typography>
                    </a>
                    
                </Grid>
                <Grid item>
                   
                </Grid>
            </Grid>
        </div>
        </ThemeProvider>
    )
}

export default Login;