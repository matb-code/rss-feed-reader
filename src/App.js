import Home from './components/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/register' component={SignUp} />
      </Switch>
      </div>
    </BrowserRouter>
    )
}

export default App;
