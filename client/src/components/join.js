import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const Join = ({ allowNext }) => {
  const [data1, setData1] = React.useState(null);
  const [data2, setData2] = React.useState(null);
  const [name, setName] = React.useState('');

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'data1':
        return setData1(target.value);
      case 'data2':
        return setData2(target.value);
      case 'name':
        return setName(target.value);
    }
  };

  const useStyles = makeStyles((theme) => ({
    dataGrid: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    select: { minWidth: 150 },
    icon: { alignSelf: 'center' },
    add: { color: theme.palette.grey[600], fontSize: '1.75rem' },
    equals: { color: theme.palette.grey[600], fontSize: '2rem' }
  }));
  const classes = useStyles();

  if (!data1 || !data2 || !name.trim()) {
    allowNext(false);
  } else {
    allowNext(true);
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Typography>
          Join the datasets into a{' '}
          <Typography color='secondary' component='span'>
            combination
          </Typography>{' '}
          by selecting which values to combine from each.
        </Typography>
      </Container>
      <Grid container spacing={3} className={classes.dataGrid} justify='center'>
        <Grid item>
          <TextField
            select
            label={'Dataset 1'}
            variant='filled'
            value={data1}
            name='data1'
            onChange={handleChange}
            className={classes.select}
          >
            <MenuItem value={'col1'}>Col 1</MenuItem>
            <MenuItem value={'col2'}>Col 2</MenuItem>
            <MenuItem value={'col3'}>Col 3</MenuItem>
            <MenuItem value={'col4'}>Col 4</MenuItem>
          </TextField>
        </Grid>
        <Grid item className={classes.icon}>
          <Typography className={classes.add}>{'+'}</Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label={'Dataset 2'}
            variant='filled'
            value={data2}
            name='data2'
            onChange={handleChange}
            className={classes.select}
          >
            <MenuItem value={'col1'}>Col 1</MenuItem>
            <MenuItem value={'col2'}>Col 2</MenuItem>
            <MenuItem value={'col3'}>Col 3</MenuItem>
            <MenuItem value={'col4'}>Col 4</MenuItem>
          </TextField>
        </Grid>
        <Grid item className={classes.icon}>
          <Typography className={classes.equals}>{'='}</Typography>
        </Grid>
        <Grid item>
          <TextField
            label={'Combination name'}
            variant='filled'
            value={name}
            name='name'
            onChange={handleChange}
            className={classes.select}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Join;
