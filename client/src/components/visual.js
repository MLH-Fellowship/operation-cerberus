import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const valueOptions = [
  { label: 'Fiscal Year', val: 'fy' },
  { label: 'Amount Spent', val: 'as' },
  { label: 'Department', val: 'dp' },
  { label: 'Location', val: 'lc' },
  { label: 'Date', val: 'dt' }
];

const filterOptions = ['Less than', 'Greater than', 'Equals', 'Does not equal'];

const Visual = ({ chartChange, xval, yval, visual, allowNext, fileID }) => {
  const [filters, setFilters] = React.useState([]);
  const [advanced, setAdvanced] = React.useState(false);

  const handleChange = ({ target }) => {
    setFilters(target.value);
  };

  useEffect(() => {
    if (xval && yval && visual) {
      allowNext(true);
    } else {
      allowNext(false);
    }
  }, [xval, yval, visual, allowNext]);

  useEffect(() => {
    // console.log(fileID);
    // fetch(`http://localhost:5000/database?id=${fileID}`).then((res) =>
    //   res.json().then((json) => console.log(json))
    // );
  }, [fileID]);

  const useStyles = makeStyles((theme) => ({
    spacing: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    select: {
      minWidth: 150
    },
    filters: {
      width: 150,
      textOverflow: 'ellipsis'
    }
  }));
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='sm'>
        <Typography>
          Select how you want to visualize the data. You will be able to
          customize this visual in the next step.
        </Typography>
      </Container>
      <Grid container justify='center' spacing={3} className={classes.spacing}>
        <Grid item>
            <TextField
                select
                label='Visual'
                variant='filled'
                name='visual'
                value={visual}
                onChange={chartChange}
                defaultValue=''
                className={classes.select}
            >
                <MenuItem value={'bar'}>Bar</MenuItem>
                <MenuItem value={'pie'}>Pie</MenuItem>
                <MenuItem value={'line'}>Line</MenuItem>
            </TextField>
        </Grid>
        <Grid item>
            <TextField
            select
            label='X-value'
            variant='filled'
            name='xval'
            value={xval}
            onChange={chartChange}
            className={classes.select}
            >
                {valueOptions.map((item) => (
                    <MenuItem value={item.val} disabled={item.val === yval}>
                    {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            label='Y-value'
            variant='filled'
            name='yval'
            value={yval}
            onChange={chartChange}
            className={classes.select}
          >
            {valueOptions.map((item) => (
              <MenuItem value={item.val} disabled={item.val === xval}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container justify='center' className={classes.spacing}>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => setAdvanced(e.target.checked)}
                value={advanced}
              />
            }
            label='Advanced options'
          />
        </Grid>

        <Collapse in={advanced}>
          <Grid container justify='center' spacing={3}>
            <Grid item>
              <TextField
                select
                label='Filter value'
                variant='filled'
                className={classes.select}
              >
                {valueOptions.map((item) => (
                  <MenuItem value={item.val}>{item.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <FormControl variant='filled' className={classes.filters}>
                <InputLabel>Filters</InputLabel>

                <Select
                  multiple
                  value={filters}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {filterOptions.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                      <Checkbox checked={filters.indexOf(filter) > -1} />
                      <ListItemText primary={filter} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                label='Filter amount'
                variant='filled'
                className={classes.filters}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </>
  );
};

export default Visual;
