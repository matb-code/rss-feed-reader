import React from 'react';
import { Button, Grid, IconButton, Menu, MenuItem } from  '@material-ui/core'
import { AccountCircle, AddCircle } from '@material-ui/icons'
import {Link} from 'react-router-dom';

function NavSection() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuItem = ['Logout']

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuList = menuItem.map(item => {
        return (
            <MenuItem onClick={handleClose}>{item}</MenuItem>
        )
    });

    return (
        <Grid container justify='flex-end' spacing={1} style={{paddingTop: 10}}>
            <Grid item>
                <Link to='/addfeed'>
                    <Button startIcon={<AddCircle />} style={{marginTop: 5}}>
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