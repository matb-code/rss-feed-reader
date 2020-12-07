import React, {useState, createContext} from 'react';

export const FeedContext = createContext();

function FeedContextProvider(props) {
    const [feedCategory, setFeedCategory] = useState(['Tech', 'News']);
    const [feedInfo, setFeedInfo] = useState({})
    const [follow, setFollow] = useState(false);
    const [folderFeeds, setFolderFeeds] = useState([]);

    function saveFeedToFolder(feed, folder) {
        //console.log(typeof folderFeeds);
        const [type] = folderFeeds.filter(f => f.folder === folder);
        console.log(type);

        if(type === undefined){
            const newFeed = {folder: folder, feeds:[feed]}
            console.log(newFeed);
            setFolderFeeds(x => [...x, newFeed]);
            console.log(folderFeeds);
        }
        else{
            
            const [folderToEdit] = folderFeeds.filter(f => f.folder === type.folder);
            const folderToKeep = folderFeeds.filter(f => f.folder !== type.folder);
            console.log(folderToEdit);
            console.log(folderToKeep);
            folderToEdit.feeds.push(feed);
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

    function fetchFeed(link) {
        setFeedInfo({
            image: 'https://www.corporateleadersgroup.com/reports-evidence-and-insights/news-images/cnn-logo.tif/image_preview',
            name: 'CNN',
            link: 'cnn.com',
            description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Collige omnia, quae soletis: Praesidium amicorum.</b> Quae quo sunt excelsiores, eo dant clariora indicia naturae. Suo enim quisque studio maxime ducitur. Iam in altera philosophiae parte. </p>'
    
        })
    }

    return (
        <FeedContext.Provider value={{
            feedCategory, setFeedCategory, feedInfo, setFeedInfo, fetchFeed, follow, setFollow, 
            saveFeedToFolder, folderFeeds, getFeedFolder
            }}
        >
            {props.children}
        </FeedContext.Provider>
    )
}

export default FeedContextProvider;