import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserContextProvider from'./Context/UserContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
      <UserContextProvider>
        
      <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/home' component={Home} />
            <Route path='/register' component={SignUp} />
      </Switch>
      </UserContextProvider>
      </div>
    </Router>
    )
}

export default App;
