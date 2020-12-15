import React from 'react';
import CardView from './CardView';
import { Grid, makeStyles } from '@material-ui/core';
import {CardContext} from '../Context/CardContext';
import {FeedContext} from '../Context/FeedContext';

const useStyles = makeStyles({
    heading2: {
        color: '#948479'
    }
})

function TodayView(){
    const classes = useStyles();
    const {content, auth} = React.useContext(CardContext);
    const {fetchUserSources} = React.useContext(FeedContext);

    React.useEffect(() => {
        console.log('Called!')
        fetchUserSources();
    }, [auth])

    return (
        <Grid container>
            <Grid item>
                <h1>Today</h1>
                <h3 className={classes.heading2}>The insights you need to keep ahead</h3>
            </Grid>

            <CardView content={content}/>

        </Grid>
    )
}

export default TodayView;