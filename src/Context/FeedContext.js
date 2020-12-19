import React, {useState, createContext} from 'react';
import {UserContext} from './UserContext';

export const FeedContext = createContext();


const BASE_URL = 'http://127.0.0.1:8000';

function FeedContextProvider(props) {
    const [feedCategory, setFeedCategory] = useState([]);
    const [feedInfo, setFeedInfo] = useState([]);
    const [follow, setFollow] = useState(null);
    const [unfollow, setUnfollow] = useState(null);
    const [folderFeeds, setFolderFeeds] = useState([]);
    const {auth} = React.useContext(UserContext);
    const [userSources, setUserSources] = useState([]);
    const [sourceArticle, setSourceArticle] = useState([]);
   

    function getFeedFolder(){
        const feeds = folderFeeds.map(folderFeed => {
            const [feedFolder] = folderFeed.feeds.map(feed => ({folder: folderFeed.folder, feed: feed}))
            return feedFolder
        })

        return feeds;
    }

    function getUserSourcesTitle(){
        return userSources.length?userSources.map(s => s.source.title):[]
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

    async function followFeed(folder) {
        console.log(auth);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${auth.token}` },
        }
        await fetch(`${BASE_URL}/api/feed/follow/${follow}/${folder}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetchUserSources();
            }).catch(err => {
                console.log(err);
            })

    }

    async function fetchUserSources() {
        console.log('FetchuserSources calledddd !!!!!!! ');
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/source`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('USer sources data ===== ', data);
                setUserSources(data);
                let f = []
                let folders = data.length>0 ? data.map(source => {
                    if (!f.includes(source.folder)) {
                        console.log('Inside the map function --------- ')
                        f.push(source.folder);
                        return source.folder;
                    }
                    else {
                        return ''
                    }
                }) : []
                const final = folders.filter(f1 => f1 !== '');
                console.log('f === ', f)
                console.log('finall ===== ', final);

                setFeedCategory(final);
            }).catch(err => console.log(err))

        // const f = []
        // const folders = userSources.length ? userSources.map(source => {
        //     if (!f.includes(source.folder)){
        //         f.push(source.folder);
        //         return source.folder;
        //     }
        //     else{
        //         return ''
        //     }
        // }):[]
        // const final = folders.filter(f =>  f !== '');
        // console.log('finall ===== ', final);

        // setFeedCategory(final);

    }

    async function unfollowFeed(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/unfollow/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                fetchUserSources();
            })
    }    
    
    async function fetchSourceArticle(id){
        console.log(id)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/article/source/${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                setSourceArticle(res);
            })
    }

    return (
        <FeedContext.Provider value={{
            feedCategory, 
            setFeedCategory, 
            feedInfo, 
            setFeedInfo, 
            fetchFeed, 
            follow, 
            setFollow,
            folderFeeds, 
            getFeedFolder, 
            userSources, 
            fetchUserSources, 
            unfollow, 
            setUnfollow,
            followFeed,
            unfollowFeed,
            getUserSourcesTitle,
            sourceArticle,
            fetchSourceArticle
            }}
        >
            {props.children}
        </FeedContext.Provider>
    )
}

export default FeedContextProvider;