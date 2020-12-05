import React, {useState, createContext} from 'react';

export const FeedContext = createContext();

function FeedContextProvider(props) {
    const [feedCategory, setFeedCategory] = useState(['Tech', 'News']);

    return (
        <FeedContext.Provider value={{feedCategory, setFeedCategory}}>
            {props.children}
        </FeedContext.Provider>
    )
}

export default FeedContextProvider;