import React from 'react';
import { Grid, makeStyles, Card, CardHeader, Avatar, Typography, CardContent, CardActions, IconButton} from "@material-ui/core";
import { FeedContext } from '../Context/FeedContext';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PaginationButtons from './PaginationButtons';


const useStyles = makeStyles({
    heading2: {
        color: '#948479',
        marginBottom: 20
    },
    cardRoot: {
        width: 800,
        maxWidth: '100vw',
        marginBottom: 15,
        padding:10
      },
    media: {
        height: 140,
    }
})


function SourceView(props) {
    console.log(props)
    const source_id = props.match.params.id;
    console.log(source_id);
    const classes = useStyles();
    const {fetchSourceArticle, sourceArticle} = React.useContext(FeedContext);

    React.useEffect(() => {
        console.log('Called!')
        fetchSourceArticle(source_id);
    }, [source_id])

    const [currentPage, setCurPage] = React.useState(1);
    const [postPerPage] = React.useState(10);
    const len = sourceArticle.length;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const content = sourceArticle.length > postPerPage ? sourceArticle.slice(indexOfFirstPost, indexOfLastPost) : sourceArticle;

    const cardList = content.map(e => {
        return(
            <Grid item key={e.id}>
                <Card className={classes.cardRoot}>
                    <CardHeader
                        avatar={
                        <Avatar src={e.source.source_logo} variant='rounded' />
                        }
                        title={
                            <Typography style={{fontFamily: 'Roboto', lineHeight: 1.5}} variant='h6'>
                            {e.title}
                            </Typography>}
                        subheader={new Date(e.published_date) + ' | ' + e.source.source_name}
                    />
                    <CardContent dangerouslySetInnerHTML={{__html: e.summary}} 
                    style={{padding:10, fontSize: 16, fontFamily: 'Roboto', lineHeight: 1.5, textAlign: 'justify'}}>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                             <BookmarkBorderIcon />
                        </IconButton>
                        <a target="_blank" href={e.link}>
                            <h5>{'Go to the site >>>'}</h5>
                        </a>
                    </CardActions>
                </Card>
            </Grid>
            
        )
    })
    return (
        <Grid container direction='column'>
            <Grid item>
                <h1>{sourceArticle[0].source.source_name}</h1>
                <h3 className={classes.heading2}>Get all from {sourceArticle[0].source.source_name} here!</h3>
            </Grid>
            {cardList}
            <Grid item style={{padding: '0 15vw'}}>
             {content.length >= 10? <PaginationButtons totalPosts={len} postsPerPage={postPerPage} setCurPage={setCurPage}/> : <div />}
            </Grid>
        </Grid>
    )
}

export default SourceView;