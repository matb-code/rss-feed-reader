import { Grid, Typography, InputAdornment } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

function AddFeed() {
    return (
        <Grid container direction='column'>
            <Grid item style={{marginTop:30}}>
                <Typography style={{color: '#948479', fontSize: 24}}>
                    Discover the best sources for any topic
                </Typography>
            </Grid>
            <Grid item>
                <form>
                <InputLabel htmlFor="search-bar" style={{marginTop: 30}}>Search and Follow</InputLabel>
                    <Input
                    id="search-bar"
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    }
                    style={{marginTop: 30, width:'60vw'}}
                    placeholder='Search by RSS link'
                    
                    />
                </form>
            </Grid>

            <Grid item>

            </Grid>
        </Grid>
        
    )
}

export default AddFeed;