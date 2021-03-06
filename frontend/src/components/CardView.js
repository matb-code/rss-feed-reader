import { Grid, makeStyles, Typography, Avatar, IconButton} from '@material-ui/core';
import { Card, CardHeader, CardMedia, CardActions, CardContent } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { red } from '@material-ui/core/colors';
import { CardContext } from '../Context/CardContext';


import React from 'react';

const useStyles = makeStyles({
    cardRoot: {
        maxWidth: 300,
        marginBottom: 25
      },
    media: {
        height: 140,
    },
    avatar: {
        backgroundColor: red[500],
    },
})

function CardView(props) {
    const classes = useStyles();
    const contents = props.content;
    const {content, bookmarkedContent, setBookmarkedContent, bookmarkClicked, setBookmarkClicked} = React.useContext(CardContext);

    const handleBookmark = (id) => {
        const toBookmark = content.filter(c => c.id === id)

        setBookmarkClicked(bClicked => ({
            clicked: !bClicked.clicked,
            clickId: id
        }));
        setBookmarkedContent(prevContent => [...prevContent, toBookmark]);
        console.log(bookmarkedContent);
    }
    const cardList = contents.map(e => {
        return(
            <Grid item xs={4} key={e.id}>
                <Card className={classes.cardRoot}>
                    <CardHeader
                        avatar={
                        <Avatar className={classes.avatar}>
                            R
                        </Avatar>
                        }
                        title={e.title}
                        subheader={e.date}
                    />
                    <CardMedia
                        className={classes.media}
                        image={e.image}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {e.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => {handleBookmark(e.id)}}>
                            {bookmarkClicked.clicked && bookmarkClicked.clickId === e.id ? <BookmarkIcon /> : 
                            <BookmarkBorderIcon />}
                        </IconButton>
                        <a href='/#'>
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