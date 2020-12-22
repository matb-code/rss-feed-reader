import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      alignItems: 'center'
    },
  },
}));

export default function PaginationButtons({totalPosts, postsPerPage, setCurPage}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(totalPosts/postsPerPage);
  
  const handleClick = (event, value) => {
      setPage(value);
      setCurPage(value);
  }
  
  return (
    <div className={classes.root}>
      <Pagination variant='outlined' count={totalPages} page= {page} showFirstButton showLastButton onChange={handleClick} />
    </div>
  );
}
