import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const Customize = ({ chartChange }) => {
  const useStyles = makeStyles((theme) => ({
    spacing: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4)
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Container maxWidth='sm' className={classes.spacing}>
        <Typography>
          Customize your visual with the options below and export it.
        </Typography>
      </Container>
      <Grid container justify='center'>
        <Grid item>
          <TextField
            variant='filled'
            label='Chart title'
            name='chart-title'
            onChange={chartChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Customize;
