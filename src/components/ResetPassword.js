import React from 'react';
import { Container, Typography, TextField, Button, Avatar, Grid } from '@material-ui/core';
import {Redirect} from 'react-router-dom';
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



function ResetPassword({location}) {
    const [token, setToken] = React.useState('');
    const [fields, setFields] = React.useState({
        new_password: null,
        new_password2: null
    });
    const [errorMessage, setErrorMessage] = React.useState('');
    const {resetOk, sendForReset} = React.useContext(UserContext);
    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const t = params.get('token')
        setToken(t ? t : '');
    }, [])

    const handleChange = (e) => {
        setFields(prev => ({...prev, [e.target.id]:e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(fields['new_password'] !== fields['new_password2']){
            setErrorMessage('Password Fields donot match!');
        }else{
            console.log('OK!');
            const rc = {Password: fields['new_password'], Token: token};
            console.log(rc);
            sendForReset(rc);
            if(resetOk){
                return <Redirect to='/' /> 
            }
        }
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
            <Typography variant='subtitle1'>Reset Password</Typography>
                    <form onSubmit={handleSubmit} >
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='New Password'
                            type='password'
                            style={{marginBottom:15}}
                            id='new_password'
                            onChange={handleChange}
                        />
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='Confirm New Password'
                            type='password'
                            style={{marginBottom:15}}
                            id='new_password2'
                            onChange={handleChange}
                        />
                        <br />
                        {errorMessage !== '' ? 
                            <div>
                            <span style={{color:"red"}}>
                                {errorMessage}
                            </span>
                            <br />
                            <br />
                                </div>
                            : <div></div>
                        }
                        <Button variant='outlined'
                            type='submit' 
                            style={{color: 'white', backgroundColor:'green', marginBottom:15}} 
                        > 
                            Reset
                        </Button>
                    </form>
            </Grid>
       
        </Container>
        </ThemeProvider>
    )
}

export default ResetPassword;