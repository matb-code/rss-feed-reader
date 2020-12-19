import React from 'react';
import CardView from './CardView';
import { Grid, makeStyles } from '@material-ui/core';
import {CardContext} from '../Context/CardContext';
import {FeedContext} from '../Context/FeedContext';
import PaginationButtons from './PaginationButtons';

const useStyles = makeStyles({
    heading2: {
        color: '#948479'
    }
})

function TodayView(){
    const classes = useStyles();

    const {content} = React.useContext(CardContext);
    const {fetchUserSources} = React.useContext(FeedContext);

    const [currentPage, setCurPage] = React.useState(1);
    const [postPerPage] = React.useState(10);

    const len = content.length;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const postsToDisplay = content.slice(indexOfFirstPost, indexOfLastPost);
    

    React.useEffect(() => {
        console.log('Todayview Useffect Called!')
        fetchUserSources();
    },[])

    return (
        <Grid container>
            <Grid item>
                <h1>Today</h1>
                <h3 className={classes.heading2}>The insights you need to keep ahead</h3>
            </Grid>

            <CardView content={postsToDisplay}/>
            <Grid item style={{padding: '0 15vw'}}>
            {content.length > 10? <PaginationButtons totalPosts={len} postsPerPage={postPerPage} setCurPage={setCurPage}/> : <div />}
            </Grid>

        </Grid>
    )
}

export default TodayView;