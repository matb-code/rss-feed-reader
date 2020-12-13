import { Avatar, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FeedContext } from '../Context/FeedContext';
import FollowPopUp from './FollowPopUp';

function FeedInfoCard() {
    const {feedInfo, setFollow} = React.useContext(FeedContext);
    const feedLength = feedInfo.length;

    

    const handleFollow = (id) => {
        setFollow(id);
    }
    return (
        <div>
         {feedLength !== 0 ?
            (feedInfo.map(feed => {
                return (<Paper variant='outlined' style={{marginTop: 30, width:'40vw', padding:20}} key={feed.id}>
                <Grid container>
                    <Grid item xs={2}>
                        <Avatar variant='rounded' src={feed.logo_link} style={{height: 50, width:50}} />
                    </Grid>
                    <Grid item container direction='column' xs={10}>
                        <Grid item container>
                            <Grid item xs={8}>
                                <Typography variant='h6'>{feed.title}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant='outlined' onClick={() => handleFollow(feed.id)}> Follow </Button>
                                <FollowPopUp />
                            </Grid>
                            
                        </Grid>

                        <Grid item>
                            <a href= {feed.link}><Typography variant='subtitle2'>{feed.link}</Typography></a>
                        </Grid>

                        <Grid item style={{marginTop: 20}}>
                            <Typography variant='body2'>{feed.subtitle}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>)
            }))  : (<div />)
        }   
        </div>
        
    )
}

export default FeedInfoCard;