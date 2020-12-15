import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { FeedContext } from '../Context/FeedContext';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, ListItemText} from '@material-ui/core';
import {withRouter, Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default withRouter(function FollowPopUp(props) {
  const classes = useStyles();
  const {follow, setFollow, feedCategory, followFeed} = React.useContext(FeedContext);
  const [folder, setFolder] = React.useState('');

  const handleClose = () => {
    setFollow(false);
  };

  const handleMenuClick = (cat) => {
      console.log(props);
      followFeed(cat);
      handleClose();

  }
  const handleChange = (e) => {
        setFolder(e);
  }
  
  const menuList = feedCategory.map(cat => {
      return(
          cat.includes(folder) &&
          <MenuItem onClick={() => {handleMenuClick(cat)}} key={cat} style={{padding: '20px 10px'}}>
            {cat}
          </MenuItem>
      )
  })

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={follow} onClose={handleClose}>
        <DialogTitle>Save Feed</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
            <Input
                    id="search-bar"
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    }
                    style={{width:'20vw'}}
                    placeholder='Search Feed Folder'
                    onChange={handleChange}
                />
            </FormControl>
          </form>
          {menuList}
          <MenuItem component={Link} to='/createfeed' style={{width: '100%'}}>
                <ListItemText primary="Create New Folder" />
          </MenuItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
