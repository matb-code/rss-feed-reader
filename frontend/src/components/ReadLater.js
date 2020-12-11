import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import {CardContext} from '../Context/CardContext';
import CardView from './CardView';

const useStyles = makeStyles({
    heading2: {
        color: '#948479',
        fontSize: 12
    }
})

function ReadLater() {
    const classes = useStyles();
    const {bookmarkedContent} = React.useContext(CardContext); 

    return (
        <div>
            <Grid container direction='column'>
                <Grid item>
                    <p className={classes.heading2}>BOARD</p>
                    <h1>Read Later</h1>
                </Grid>
                <Grid item>
                    <p className={classes.heading2}>LATEST</p>
                </Grid>
                
                <CardView content={bookmarkedContent} />
            </Grid>
        </div>
    )
}

export default ReadLater;