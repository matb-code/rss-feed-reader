import React, {useState, createContext} from 'react';
import {UserContext} from './UserContext';

export const FeedContext = createContext();


const BASE_URL = 'http://127.0.0.1:8000';

function FeedContextProvider(props) {
    const [feedCategory, setFeedCategory] = useState(['Tech', 'News']);
    const [feedInfo, setFeedInfo] = useState([]);
    const [follow, setFollow] = useState(null);
    const [unfollow, setUnfollow] = useState(null);
    const [folderFeeds, setFolderFeeds] = useState([]);
    const {auth} = React.useContext(UserContext);
    const [userSources, setUserSources] = useState([]);
   
    React.useEffect(() => {
        unfollowFeed(unfollow);
        fetchUserSources();
    }, [unfollow])

    function saveFeedToFolder(folder) {
        //console.log(typeof folderFeeds);
        const [type] = folderFeeds.filter(f => f.folder === folder);
        const [toFollow] = feedInfo.filter(feed => feed.id === follow);
        followFeed();
        console.log(type);


        if(type === undefined){
            const newFeed = {folder: folder, feeds:[toFollow]}
            console.log(newFeed);
            setFolderFeeds(x => [...x, newFeed]);
            console.log(folderFeeds);
        }
        else{
            
            const [folderToEdit] = folderFeeds.filter(f => f.folder === type.folder);
            const folderToKeep = folderFeeds.filter(f => f.folder !== type.folder);
            console.log(folderToEdit);
            console.log(folderToKeep);
            folderToEdit.feeds.push(toFollow);
            setFolderFeeds([...folderToKeep, folderToEdit]);
            console.log(folderFeeds);
                 
        }
    }

    function getFeedFolder(){
        const feeds = folderFeeds.map(folderFeed => {
            const [feedFolder] = folderFeed.feeds.map(feed => ({folder: folderFeed.folder, feed: feed}))
            return feedFolder
        })

        return feeds;
    }

    async function fetchFeed() {
        console.log(auth);

        const requestOptions = {
            method: 'GET'
        }

        await fetch(`${BASE_URL}/api/live_feed/source/`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setFeedInfo(data);
                console.log(feedInfo);
            }).catch(err => {
                console.log(err);
            })
    }

    async function followFeed() {
        console.log(auth);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${auth.token}` },
        }
        await fetch(`${BASE_URL}/api/feed/follow/${follow}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
    }

    async function fetchUserSources() {
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/source`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserSources(data);
            }).catch(err => console.log(err))
    }

    async function unfollowFeed() {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/unfollow/${unfollow}`, requestOptions)
            .then(res => res.json())
            .then(res => console.log(res))
    }    
    

    return (
        <FeedContext.Provider value={{
            feedCategory, setFeedCategory, feedInfo, setFeedInfo, fetchFeed, follow, setFollow, 
            saveFeedToFolder, folderFeeds, getFeedFolder, userSources, fetchUserSources, unfollow, setUnfollow
            }}
        >
            {props.children}
        </FeedContext.Provider>
    )
}

export default FeedContextProvider;