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
        paddingLeft: theme.spacing(2)
    }
  }));


function SideBar(props) {

    const { location: {pathname} } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [feedOpen, setFeedOpen] = React.useState({open:false, id:null});
    const {feedCategory, folderFeeds} = React.useContext(FeedContext);
    const [folder, setFolder] = React.useState([])
    

    const handleFeedOpen = (id) => {
        setFeedOpen(prev => ({open: !prev.open, id: id}))
        const f = folderFeeds.filter(x => x.folder === id );
        setFolder(f);
    }
    const handleClick = () =>{
        setOpen(!open);
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
                            {folder.length ? (folder[0].feeds.map( feed => {
                                return (
                                    <MenuItem>
                                        <Avatar variant='square' src={feed.image} style={{height: 20, width:20}} />
                                        <ListItemText style={{marginLeft: 20}}>{feed.name}</ListItemText>
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
            <Grid item xs={12} style={{paddingTop:60}}>
                <MenuList>
                    <MenuItem component={Link} to='/home' selected={'/home' === pathname} >
                        <ListItemIcon>
                            <DynamicFeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Today"/>
                    </MenuItem>

                    <MenuItem component={Link} to='/readlater' selected={'/readlater' === pathname}>
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
                                <IconButton style={{width:3, height:3, marginLeft:10}} component={Link} to='/editfeed'>
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
                            <MenuItem component={Link} to='/createfeed' style={{width: '100%'}} 
                                selected={'/createfeed' === pathname}>
                                <ListItemText primary="Create More Feed" />
                            </MenuItem>
                        </MenuList>
                    </Collapse>
                </MenuList>
 
            </Grid>
        </Grid>
        
    )
}

export default withRouter(SideBar);