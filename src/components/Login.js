import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'

const { Button, Grid, Typography, TextField, Avatar } = require("@material-ui/core");
const { Link } = require("react-router-dom");


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

function Login() {
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
                    <Typography variant='subtitle1'>Login to your Account</Typography>
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
                        label='Password'
                        type='password'
                        style={{marginBottom:15}}
                    />
                    <br />
                    <Button variant='filled' style={{color: 'white', backgroundColor:'green', marginBottom:15}} component={Link} to='/home'> Log In </Button>
                    </form>
                    <a href='/#'>
                        <Typography variant='subtitle2'>Forgot your Password?</Typography>
                    </a>
                    <a href='/register'>
                        <Typography variant='subtitle2'>Don't have and Account yet?</Typography>
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