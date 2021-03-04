import React from 'react';
import Layout from '../components/layout';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import PickerItem from '../components/pickerItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import SignUpUser from '../components/SignUpUser';

const Settings = ({ modeToggle, mode, setPrimary, setSecondary }) => {
  const SettingItem = ({ label, control }) => {
    return (
      <div className={classes.settingItem}>
        <Typography>{label}</Typography>
        {control}
      </div>
    );
  };

  const resetColors = () => {
    setPrimary('def');
    setSecondary('def');
  };

  const useStyles = makeStyles((thm) => ({
    settingItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: thm.spacing(0.75),
      marginTop: thm.spacing(1.5)
    },
    section: {
      marginBottom: thm.spacing(5)
    }
  }));
  const classes = useStyles();

  return (
    <Layout title='Settings' thin>
      <div className={classes.section}>
        <Typography variant='h4' component='h2' gutterBottom>
          Register User
        </Typography>
        <Divider />
        <SignUpUser/>
      </div>

      <div className={classes.section}>
        <Typography variant='h4' component='h2' gutterBottom>
          Units
        </Typography>

        <Divider />

        <Container maxWidth='md'>
          <SettingItem label='Metric units' control={<Switch size='small' />} />
          <SettingItem
            label='Date format'
            control={
              <Select value={3}>
                <MenuItem value={1}>MM/DD/YY</MenuItem>
                <MenuItem value={2}>DD/MM/YY</MenuItem>
                <MenuItem value={3}>YY/MM/DD</MenuItem>
              </Select>
            }
          />
          <SettingItem
            label='Currency'
            control={
              <Select value={1}>
                <MenuItem value={1}>$</MenuItem>
                <MenuItem value={2}>€</MenuItem>
                <MenuItem value={3}>£</MenuItem>
                <MenuItem value={4}>¥</MenuItem>
                <MenuItem value={5}>₪</MenuItem>
              </Select>
            }
          />
          <SettingItem
            label='Decimal seperator'
            control={
              <Select value={2}>
                <MenuItem value={1}>Comma</MenuItem>
                <MenuItem value={2}>Period</MenuItem>
              </Select>
            }
          />
        </Container>
      </div>

      <div className={classes.section}>
        <Typography variant='h4' component='h2' gutterBottom>
          Display
        </Typography>
        <Divider />
        <Container maxWidth='md'>
          <SettingItem
            label='Dark theme'
            control={
              <Switch
                size='small'
                onChange={modeToggle}
                checked={mode === 'dark'}
              />
            }
          />

          <PickerItem type='primary' set={setPrimary} />
          <PickerItem type='secondary' set={setSecondary} />
          <SettingItem
            label='Reset colors'
            control={
              <Button size='small' onClick={resetColors}>
                Reset
              </Button>
            }
          />
        </Container>
      </div>
    </Layout>
  );
};

export default Settings;
