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

function SendEmail() {


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
            <Typography variant='subtitle1'>Enter Email to receive link for changing password.</Typography>
                    <form >
                        <TextField 
                            variant="outlined"
                            color='secondary'
                            label='Email'
                            type='email'
                            placeholder='test@test.com'
                            style={{marginBottom:15}}
                            id='email'
                        />
                        <br />
                        <Button variant='outlined'
                            type='submit' 
                            style={{color: 'white', backgroundColor:'green', marginBottom:15}} 
                        > 
                            Submit 
                        </Button>
                    </form>
            </Grid>
       
        </Container>
        </ThemeProvider>
    )
}

export default SendEmail;