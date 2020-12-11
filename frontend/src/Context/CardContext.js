import React from 'react';

export const CardContext = React.createContext();

function CardContextProvider(props) {
    const [content, setContent] = React.useState([
        {
            id: 1,
            image: "https://assets.wholefoodsmarket.com/recipes/4450/2048/1536/4450-4.jpg",
            title: "Shrimp and Chorizo Paella",
            date: "September 14, 2016",
            content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        },
        {
            id: 2,
            image: "https://assets.wholefoodsmarket.com/recipes/4450/2048/1536/4450-4.jpg",
            title: "Shrimp and Chorizo Paella",
            date: "September 14, 2016",
            content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        },
        // {
        //     id: 3,
        //     image: "https://assets.wholefoodsmarket.com/recipes/4450/2048/1536/4450-4.jpg",
        //     title: "Shrimp and Chorizo Paella",
        //     date: "September 14, 2016",
        //     content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        // },
        // {
        //     id: 4,
        //     image: "https://assets.wholefoodsmarket.com/recipes/4450/2048/1536/4450-4.jpg",
        //     title: "Shrimp and Chorizo Paella",
        //     date: "September 14, 2016",
        //     content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        // }
    ]);

    const [bookmarkedContent, setBookmarkedContent] = React.useState([]);
    const [bookmarkClicked, setBookmarkClicked] = React.useState([]);

    return (
        <CardContext.Provider 
            value={{
                content, setContent, bookmarkedContent, setBookmarkedContent, bookmarkClicked, setBookmarkClicked
            }}
        >
            {props.children}
        </CardContext.Provider>
    )

}

export default CardContextProvider;