import Grid from '@material-ui/core/Grid';
import SideBar from './components/SideBar';
import { Divider } from '@material-ui/core';
import NavSection from './components/NavSection';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodayView from './components/TodayView';
import FeedCategoryForm from './components/FeedCategoryForm';
import FeedContextProvider from './Context/FeedContext';
import CardContextProvider from './Context/CardContext';
import ReadLater from './components/ReadLater';
import AddFeed from './components/AddFeed';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <FeedContextProvider>
      <Grid container style={{height: '100vh'}}>
          <Grid item xs={2} style={{backgroundColor: '#F6F7F8'}}>
            <SideBar />
          </Grid>

          <Grid item container xs={10} direction='column' spacing={2}>
            <Grid item>
              <NavSection />
            </Grid>

            <Grid item>
              <Divider />
            </Grid>
            
            <Grid item style={{margin: '0 8vw'}}>
              <CardContextProvider>
                <Switch>
                  <Route exact path='/' component={TodayView} />
                  <Route path='/createfeed' component={FeedCategoryForm} />
                  <Route path='/readlater' component={ReadLater} />
                  <Route path='/addfeed' component={AddFeed} />
                </Switch>
              </CardContextProvider>
            </Grid>
          </Grid>

      </Grid>
    </FeedContextProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
