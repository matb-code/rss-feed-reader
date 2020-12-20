import React from 'react';
import { Button, Grid, IconButton, Menu, MenuItem } from  '@material-ui/core'
import { AccountCircle, AddCircle } from '@material-ui/icons'
import {Link} from 'react-router-dom';
import {FeedContext} from '../Context/FeedContext';
import { UserContext } from '../Context/UserContext';


const NavSection = () => {
    const { logout} = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuItem = [
        {id:1,
        name:'Logout',
        onclick: () => {
            console.log('clicked logout');
            logout();
        },
    }
    ]
    const {fetchFeed} = React.useContext(FeedContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoute = () => {
        fetchFeed();
    }

    const menuList = menuItem.map(item => {
        return (
            <MenuItem key={item.id} component={Link} onClick={item.onclick} to='/'>{item.name}</MenuItem>
        )
    });

    return (
        <Grid container justify='flex-end' spacing={1} style={{paddingTop: 5}}>
            <Grid item>
                <Link to='/addfeed'>
                    <Button startIcon={<AddCircle />} style={{marginTop: 5}} onClick={handleRoute}>
                        Add New RSS Feed
                    </Button>
                </Link>          
            </Grid>
            <Grid item>
                <IconButton onClick={handleClick}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {menuList}
                </Menu>
            </Grid>
            
            
        </Grid>
    )
}

export default NavSection
