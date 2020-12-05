import React from 'react';

import { Button, Grid, Typography} from "@material-ui/core";
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {ListItem, MenuList, MenuItem, ListItemText, ListItemIcon, Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore, Reorder} from '@material-ui/icons';
import { makeStyles } from  '@material-ui/core/styles';
import { Link, withRouter} from 'react-router-dom';

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
  }));


function SideBar(props) {

    const { location: {pathname} } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [feedOpen, setFeedOpen] = React.useState(false);
    const {feedCategory} = React.useContext(FeedContext);
    

    const handleFeedOpen = () => {
        setFeedOpen(!feedOpen)
    }
    const handleClick = () =>{
        setOpen(!open);
    }

   
    const feedsList = feedCategory.map(text => {
        return (
        
            <MenuItem onClick={handleFeedOpen} key={text}>
                <ListItemIcon>
                    {feedOpen? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </MenuItem>
        
    )})

    return (
        <Grid container direction='column'>
            <Grid item xs={12} style={{paddingTop:60}}>
                <MenuList>
                    <MenuItem component={Link} to='/' selected={'/' === pathname} >
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
                            <Grid item xs={8}>
                                <Typography style={{marginTop: 4}}>Feeds</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={handleClick}>
                                    <Typography variant='caption'>
                                        {open ? 'Hide' : 'Show'}
                                    </Typography>
                                </Button>
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