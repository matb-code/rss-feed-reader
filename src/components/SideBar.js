import React from 'react';

import { Button, Grid, IconButton, Typography, Avatar} from "@material-ui/core";
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {ListItem, MenuList, MenuItem, ListItemText, ListItemIcon, Collapse} from '@material-ui/core';
import {ExpandLess, Reorder} from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from  '@material-ui/core/styles';
import { Link, withRouter} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';

import { FeedContext } from '../Context/FeedContext';
import { CardContext } from '../Context/CardContext';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(1),
    },
    nested2: {
        paddingLeft: theme.spacing(2),
        maxWidth: '100vw',
        fontSize: 10
    }
  }));


function SideBar(props) {

    const { location: {pathname} } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [feedOpen, setFeedOpen] = React.useState({open:false, id:null});
    const {feedCategory, fetchUserSources, userSources} = React.useContext(FeedContext);
    const [folder, setFolder] = React.useState([])
    const {fetchArticles, fetchBookmarkedArticles} = React.useContext(CardContext);

    React.useState(() => {
        console.log('Rerendered??');
        fetchUserSources(); 
    }, [userSources, feedCategory])
    

    const handleFeedOpen = (id) => {
        setFeedOpen(prev => ({open: !prev.open, id: id}))
        const f = userSources.filter(x => x.folder === id );
        setFolder(f);
    }
    const handleClick = () =>{
        setOpen(!open);
    }

    const handleContent = () => {
        fetchArticles();
    }

    const handleSources = () => {
        // fetchUserSources();
    }

    const handleBookmark = () => {
        fetchBookmarkedArticles();
    }

    const feedsList = feedCategory.map(text => {

        return (
        <div key={text}>
            <MenuItem onClick={() => handleFeedOpen(text)}>
                <ListItemIcon>
                    {feedOpen.open && (feedOpen.id === text) ? <ExpandLess /> : <ArrowForwardIosIcon style={{width:15, height:15, paddingLeft:5}}/>}
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </MenuItem>
            <Collapse in={feedOpen.open && (feedOpen.id === text)} timeout="auto" unmountOnExit>
                        <MenuList component="div" disablePadding className = {classes.nested2}>
                            {folder.length ? (folder.map( feed => {
                                return (
                                    <MenuItem key={feed.id} className={classes.nested2}>
                                        <Avatar variant='square' src={feed.source.logo_link} style={{height: 20, width:20}} />
                                        <ListItemText style={{marginLeft: 10, fontSize:10}}>{feed.source.title}</ListItemText>
                                    </MenuItem>
                                )
                            })):<div></div>
                            
                            }
                        </MenuList>
            </Collapse>

        </div>
        
    )})

    return (
        <Grid container direction='column'>
                <Grid item>
                    <Avatar src='/Feeds-Green-icon.png' style={{padding:10, width:40, height:40 }} />
                </Grid>
            <Grid item xs={12}>
                <MenuList>
                    <MenuItem component={Link} to='/home' selected={'/home' === pathname} onClick={handleContent} >
                        <ListItemIcon>
                            <DynamicFeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Today"/>
                    </MenuItem>

                    <MenuItem component={Link} to='/readlater' selected={'/readlater' === pathname} onClick={handleBookmark} >
                        <ListItemIcon>
                            <BookmarkBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Read Later"/>
                    </MenuItem>

                    <ListItem>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography style={{marginTop: 4}}>Feeds</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleClick} style={{marginLeft:30}}>
                                    <Typography variant='caption'>
                                        {open ? 'Hide' : 'Show'}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton style={{width:3, height:3, marginLeft:10}} component={Link} to='/editfeed' onClick={handleSources}>
                                    <SettingsIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <MenuList component="div" disablePadding className = {classes.nested}>
                            <MenuItem >
                                <ListItemIcon>
                                    <Reorder />
                                </ListItemIcon>
                                <ListItemText primary="All" />
                            </MenuItem>
                            {feedsList}
                            
                        </MenuList>
                    </Collapse>
                </MenuList>
 
            </Grid>
        </Grid>
        
    )
}

export default withRouter(SideBar);