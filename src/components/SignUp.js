import React from 'react';
import { Container, Typography, TextField, Button, Avatar, Grid } from '@material-ui/core';
import {Link } from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

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
                    <form>
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Email'
                        type='email'
                        placeholder='test@test.com'
                        style={{marginBottom:15}}
                    />
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Display Name'
                        type='text'
                        style={{marginBottom:15}}
                    />
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Password'
                        type='password'
                        style={{marginBottom:15}}
                    />
                    <TextField 
                        variant="outlined"
                        color='secondary'
                        label='Confirm Password'
                        type='password'
                        style={{marginBottom:15}}
                    />
                    <br />
                    <Button variant='filled' 
                        style={{color: 'white', backgroundColor:'green', marginBottom:15}} component={Link} to='/home'
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