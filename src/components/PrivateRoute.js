import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {UserContext} from '../Context/UserContext';


function PrivateRoute({component: Component, ...rest}) {
    const {auth} = React.useContext(UserContext);
    return(
        <Route 
            {...rest}
            render={props => {
                if (!auth.isAuthenticated){
                    return <Redirect to='/' />
                }else{
                    return <Component {...props} />
                }
                
            }}
        />    

    )
}

export default PrivateRoute;