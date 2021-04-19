import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits({name, date}) {
  const classes = useStyles();
  return (
    <>
      <Typography component='p' variant='h5'>
        {name}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {date}
      </Typography>
    </>
  );
}
