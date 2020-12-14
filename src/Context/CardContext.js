import React from 'react';
import {UserContext} from './UserContext';

export const CardContext = React.createContext();

const BASE_URL = 'http://127.0.0.1:8000';


function CardContextProvider(props) {
    const [content, setContent] = React.useState([]);

    const [bookmarkedContent, setBookmarkedContent] = React.useState([]);
    const [bookmarkClicked, setBookmarkClicked] = React.useState([]);
    const {auth} = React.useContext(UserContext);

    React.useEffect(() => {
        fetchArticles();
    }, [])


    async function fetchArticles(){
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Token ${auth.token}`}
        }

        fetch(`${BASE_URL}/api/feed/article`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setContent(data);
            }).catch(err => console.log(err));
    }

    return (
        <CardContext.Provider 
            value={{
                content,
                setContent,
                bookmarkedContent, 
                setBookmarkedContent, 
                bookmarkClicked, 
                setBookmarkClicked, 
                fetchArticles
            }}
        >
            {props.children}
        </CardContext.Provider>
    )

}

export default CardContextProvider;