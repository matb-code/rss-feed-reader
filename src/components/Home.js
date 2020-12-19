import Grid from '@material-ui/core/Grid';
import SideBar from './SideBar';
import { Divider } from '@material-ui/core';
import NavSection from './NavSection';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TodayView from './TodayView';
import FeedCategoryForm from './FeedCategoryForm';
import FeedContextProvider from '../Context/FeedContext';
import CardContextProvider from '../Context/CardContext';
import ReadLater from './ReadLater';
import AddFeed from './AddFeed';
import EditFeed from './EditFeed';
import SourceView from './SourceView';
import PrivateRoute from './PrivateRoute';




function Home() {
  return (
    <Router>
    <div className="App">
    <FeedContextProvider>
      <Grid container style={{height: '100vh'}}>
          <Grid item xs={2} style={{backgroundColor: '#F6F7F8'}}>
            <CardContextProvider>
              <SideBar />
            </CardContextProvider>
          </Grid>

          <Grid item container xs={10} direction='column' spacing={2}>
            <Grid item>
              <NavSection />
            </Grid>

            <Grid item>
              <Divider />
            </Grid>
            
            <Grid item style={{marginLeft: '8vw', height:'100vh', overflowY: 'scroll'}}>
              <CardContextProvider>
                <Switch>  
                  <Route path='/home' component={TodayView} />
                  <Route path='/createfeed' component={FeedCategoryForm} />
                  <Route path='/readlater' component={ReadLater} />
                  <Route path='/addfeed' component={AddFeed} />
                  <Route path='/editfeed' component={EditFeed} />
                  <Route path='/source/:id' component={SourceView} />
                </Switch>
              </CardContextProvider>
            </Grid>
          </Grid>

      </Grid>
    </FeedContextProvider>
    </div>
    </Router>
  );
}

export default Home;
