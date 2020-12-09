import React from 'react';
import { Container, Typography, TextField, Button, Avatar, Grid } from '@material-ui/core';
import {Redirect } from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {UserContext} from '../Context/UserContext';

const theme = createMuiTheme({
    typography:{
      h4: {
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

function SignUp() {
    const [reg, setReg] = React.useState({
        email: null,
        display_name: null,
        password: null,
        password2: null
    })
    const {registerUser, isRegistered} = React.useContext(UserContext);

    if(isRegistered){
        return <Redirect to='/home' />
    }

    const handleChange = (e) => {
        setReg(prev => ({...prev, [e.target.id]: e.target.value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(reg);
    }

    return (
        <ThemeProvider theme={theme}>
        <Container maxWidth='sm' style={{padding:'10vw 10vw'}}>
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar src='/Feeds-Green-icon.png' />
                </Grid>
                <Grid item>
                <Typography variant='h4'>RSS Feed Reader</Typography>
                </Grid>
                
            </Grid>

            <Grid style={{paddingLeft:60}}>
            <Typography variant='subtitle1'>Register your Account</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='Email'
                            type='email'
                            placeholder='test@test.com'
                            style={{marginBottom:15}}
                            id='email'
                            onChange={handleChange}
                        />
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='Display Name'
                            type='text'
                            style={{marginBottom:15}}
                            id='display_name'
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
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='Confirm Password'
                            type='password'
                            style={{marginBottom:15}}
                            id='password2'
                            onChange={handleChange}
                        />
                        <br />
                        <Button variant='outlined'
                            type='submit' 
                            style={{color: 'white', backgroundColor:'green', marginBottom:15}} 
                        > 
                            Sign Up 
                        </Button>
                    </form>
                    <a href='/'>
                        <Typography variant='subtitle2'>Already Have an Account?</Typography>
                    </a>
            </Grid>
       
        </Container>
        </ThemeProvider>
    )
}

export default SignUp;