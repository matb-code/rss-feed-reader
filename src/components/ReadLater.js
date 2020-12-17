import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import {CardContext} from '../Context/CardContext';
import BookmarkedCard from './BookmarkedCard';

const useStyles = makeStyles({
    heading2: {
        color: '#948479',
        fontSize: 12
    }
})

function ReadLater() {
    const classes = useStyles();
    const {bookmarkedContent, fetchBookmarkedArticles} = React.useContext(CardContext); 
    React.useEffect(() => {
        console.log('Bookmarks');
        fetchBookmarkedArticles();
    }, [])
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
                
                <BookmarkedCard content={bookmarkedContent} />
            </Grid>
        </div>
    )
}

export default ReadLater;