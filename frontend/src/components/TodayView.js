import React from 'react';
import CardView from './CardView';
import { Grid, makeStyles } from '@material-ui/core';
import {CardContext} from '../Context/CardContext';

const useStyles = makeStyles({
    heading2: {
        color: '#948479'
    }
})

function TodayView(){
    const classes = useStyles();
    const {content} = React.useContext(CardContext);

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