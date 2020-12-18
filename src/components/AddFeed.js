import { Grid, Typography, InputAdornment, Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import {FeedContext} from '../Context/FeedContext';
import FeedInfoCard from './FeedInfoCard';

function AddFeed() {
    const {fetchFeed} = React.useContext(FeedContext);
    const [search, setSearch] = React.useState('');

    const handleChange = (e) => {
        const s = e.target.value.toLowerCase()
        setSearch(s);
    }
        
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e.target[0].value);
        fetchFeed(e.target.value);
    }
    return (
        <Grid container direction='column'>
            <Grid item style={{marginTop:30}}>
                <Typography style={{color: '#948479', fontSize: 24}}>
                    Discover the best sources for any topic
                </Typography>
            </Grid>
            <Grid item>
                <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="search-bar" style={{marginTop: 30}}>Search and Follow</InputLabel>
                    <Input
                    id="search-bar"
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    }
                    style={{marginTop: 30, width:'60vw'}}
                    placeholder='Search Feed'
                    onChange={handleChange}
                    />
                    <br/>
                    <Button variant='contained' style={{marginTop:20, backgroundColor: 'green', color:'white'}} onClick={handleSubmit}>Search</Button>
                </form>
            </Grid>

            <Grid item>
                <FeedInfoCard search={search}/>
            </Grid>
        </Grid>
        
    )
}

export default AddFeed;