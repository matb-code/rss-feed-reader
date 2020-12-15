import React from 'react';
import { Button, Grid, makeStyles, TextField} from "@material-ui/core";
import { FeedContext } from '../Context/FeedContext';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles({
    heading2: {
        color: '#948479'
    },
})

function FeedCategoryForm(props) {
    console.log(props)
    const {followFeed} = React.useContext(FeedContext);
    const classes = useStyles();

    const [title, setTitle] = React.useState('');

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        followFeed(title);
        props.history.push('/addfeed');
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.history.push('/addfeed');
    }
    return (
        <Grid container direction='column'>
            <Grid item>
                <h1>Create New Feed</h1>
                <h3 className={classes.heading2}>A private collection of trusted sources you want to read</h3>
            </Grid>
            <Grid item container>
                <form onSubmit={handleSubmit}>
                    <Grid item>
                    <TextField 
                        variant='outlined'
                        color='secondary'
                        label='Title'
                        placeholder='Title'
                        style={{marginBottom:15}}
                        onChange={handleChange}
                    />
                    </Grid>

                    <Grid item>
                        <Button 
                        variant='outlined' 
                        style={{backgroundColor: 'green', color:'white', marginRight:10}}
                        onClick={handleSubmit}
                        >
                            Save
                        </Button>
                        <Button variant='outlined' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                
                
                </form>
            </Grid>
        </Grid>
    )
}

export default withRouter(FeedCategoryForm);