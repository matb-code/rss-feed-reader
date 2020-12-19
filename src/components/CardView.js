import { Grid, makeStyles, Avatar, IconButton, Typography} from '@material-ui/core';
import { Card, CardHeader, CardActions, CardContent } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { CardContext } from '../Context/CardContext';


import React from 'react';
import { FeedContext } from '../Context/FeedContext';

const useStyles = makeStyles({
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

function CardView(props) {
    const classes = useStyles();
    const contents = props.content;
    const {fetchArticles, bookmarkClicked, setBookmarkClicked, bookmarkArticle} = React.useContext(CardContext);
    const { userSources } = React.useContext(FeedContext);

    React.useEffect(() => {
        console.log('Cardview useffect')
        fetchArticles()
    }, [userSources])



    const handleBookmark = (id) => {
        bookmarkArticle(id);

        setBookmarkClicked(bClicked => ({
            clicked: !bClicked.clicked,
            clickId: id
        }));
    }
    const cardList = contents.map(e => {
        return(
            <Grid item key={e.id}>
                <Card className={classes.cardRoot}>
                    <CardHeader
                        //titleTypographyProps={{variant: 'headline', fontFamily: 'Roboto'}}
                        avatar={
                        <Avatar src={e.source.source_logo} variant='rounded' />
                        }
                        title={
                            <Typography style={{fontFamily: 'Roboto', lineHeight: 1.5}} variant='h6'>
                            {e.title}
                            </Typography>}
                        subheader={new Date(e.published_date) + ' | ' + e.source.source_name}
                    />
                    {/* <CardMedia
                        className={classes.media}
                        image={e.image}
                    /> */}
                    <CardContent dangerouslySetInnerHTML={{__html: e.summary}} 
                    style={{padding:10, fontSize: 16, fontFamily: 'Roboto', lineHeight: 1.5, textAlign: 'justify'}}>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => {handleBookmark(e.id)}}>
                            {bookmarkClicked.clicked && bookmarkClicked.clickId === e.id ? <BookmarkIcon /> : 
                            <BookmarkBorderIcon />}
                        </IconButton>
                        <a href={e.link}>
                            <h5>Read More...</h5>
                        </a>
                    </CardActions>
                </Card>
            </Grid>
            
        )
    })

    return (
            <Grid item container spacing={4}>
                {cardList}
            </Grid>
    )
}

export default CardView;