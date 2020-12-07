import { Avatar, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { FeedContext } from '../Context/FeedContext';
import FollowPopUp from './FollowPopUp';

function FeedInfoCard() {
    const {feedInfo, setFollow} = React.useContext(FeedContext);
    const feedLength = Object.keys(feedInfo).length;

    const handleFollow = () => {
        setFollow(true);
    }
    return (
        <div>
         {feedLength !== 0 ?
            (<Paper variant='outlined' style={{marginTop: 30, width:500, padding:20}}>
                <Grid container>
                    <Grid item xs={2}>
                        <Avatar variant='rounded' src={feedInfo.image} style={{height: 50, width:50}} />
                    </Grid>
                    <Grid item container direction='column' xs={10}>
                        <Grid item container>
                            <Grid item xs={8}>
                                <Typography variant='h6'>{feedInfo.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant='outlined' style={{}} onClick={handleFollow}> Follow </Button>
                                <FollowPopUp />
                            </Grid>
                            
                        </Grid>

                        <Grid item>
                            <Typography variant='subtitle1'>{feedInfo.link}</Typography>
                        </Grid>

                        <Grid item style={{marginTop: 20}}>
                            <Typography variant='body2'>{feedInfo.description}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>) : (<div></div>)
        }   
        </div>
        
    )
}

export default FeedInfoCard;