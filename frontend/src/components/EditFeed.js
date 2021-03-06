import { Avatar, Divider, Grid, Button, FormControl, Select, InputLabel, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import {FeedContext} from '../Context/FeedContext'


function EditFeed() {
    const {folderFeeds} = React.useContext(FeedContext);
    const [displayValues, setDisplayValues] = React.useState(folderFeeds);

    const handleChange = (e) => {
        const opt = e.target.value;
        if(opt !== 'All'){
            const newDisplayValues = folderFeeds.length ? folderFeeds.filter(d => d.folder === e.target.value) : []
            setDisplayValues(newDisplayValues);
            console.log(displayValues);
        }else{
            setDisplayValues(folderFeeds);
            console.log(displayValues);
        } 
        
        
    }

    const followingList = displayValues.length ? (displayValues.map( folderFeed => {
        return (
            <Grid container direction='column' key={folderFeed.folder}>
                <Grid item style={{marginBottom: 10}}>
                    <h2>{folderFeed.folder}</h2>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                {folderFeed.feeds.map(feed => {
                    return (
                        <Grid item container style={{paddingLeft: '5vw', padding:20}} spacing={2} >
                            <Grid item xs={1}><Avatar variant='rounded' src={feed.image} style={{height: 50, width:50}} /> </Grid> 
                            <Grid item xs={8}><p>{feed.name}</p></Grid>
                            <Grid item xs={3}>
                                <Button variant='outlined'> Unfollow </Button>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        )
    })) : (<div></div>)

    return (
        <div className="editFeed">
            <h1>Organize Your Sources</h1>
            <Grid container spacing={2}>
                <Grid item>
                    <FormControl variant='outlined'>
                        <InputLabel htmlFor="outlined-age-native-simple">Folder</InputLabel>
                        <Select
                        native
                        label="Folder"
                        onChange={handleChange}
                        inputProps={{
                            name: 'folder',
                            id: 'outlined-age-native-simple',
                        }}
                        style={{width: 150}}
                        >
                        <option aria-label="All" value="All">All </option>
                        {folderFeeds.map(f => {
                            return (
                                <option aria-label={f.folder} value={f.folder} key={f.folder}>{f.folder}</option>
                            )
                        })}
                        
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <form>
                        <Input
                        id="search-bar"
                        startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        }
                        style={{marginTop:15, width:'30vw'}}
                        placeholder='Search'
                        
                        />
                    </form>
                </Grid>
            </Grid>
            
            {followingList}
        </div>
    )
}

export default EditFeed;