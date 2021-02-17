import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AirplaneIcon from '@material-ui/icons/Flight';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

const drawerWidth = 240;
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const listData = [
  {
    to: '/',
    icon: <DashboardIcon />,
    text: 'Overview',
  },
  {
    to: '/travel',
    icon: <AirplaneIcon />,
    text: 'Travel',
  },
  {
    to: '/accounting',
    icon: <MoneyIcon />,
    text: 'Accounting',
  },
  {
    to: '/reports',
    icon: <BarChartIcon />,
    text: 'Reports',
  },
  {
    to: '/integrations',
    icon: <LayersIcon />,
    text: 'Integrations',
  },
];

const CustomDrawer = ({ open, handleDrawerClose }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    drawerHeader: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      marginLeft: 20,
      fontFamily: 'Teko',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
  }));

  const DrawerItem = ({ to, icon, text }, key) => {
    const [selected, setSelected] = React.useState(false);
    return (
      <NavLink
        exact
        to={to}
        isActive={(match) => setSelected(Boolean(match))}
        key={key}
      >
        <ListItem button onClick={handleDrawerClose} selected={selected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    );
  };
  const [fullList, setFullList] = React.useState(listData);

  const SimpleDialog = ({ onClose, open }) => {
    const [pageName, setPageName] = React.useState('');

    const updateList = () => {
      setFullList((listData) => [
        ...listData,
        {
          to: '/travel',
          icon: <LayersIcon />,
          text: pageName,
        },
      ]);
    };

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Dashboard Name</DialogTitle>
        <DialogContent>
          <TextField
            placeholder='Enter Text'
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Close
          </Button>
          <Button
            onClick={() => {
              updateList();
              onClose();
            }}
            color='primary'
            autoFocus
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const classes = useStyles();

  return (
    <Drawer
      variant='temporary'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onClose={handleDrawerClose}
      disablebackdroptransition={Boolean(!iOS).toString()}
      disablediscovery={iOS.toString()}
    >
      <SimpleDialog open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className={classes.toolbarIcon}>
        <Typography
          component='h1'
          variant='h4'
          color='primary'
          noWrap
          className={classes.drawerHeader}
        >
          Echelon
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        {fullList.map(({ ...fields }, key) => (
          <DrawerItem {...fields} key={key} />
        ))}
      </List>

      <Button onClick={() => setModalOpen(true)}>New Dashboard</Button>

      <Divider />

      <List>
        <>
          <ListSubheader>Saved reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Current month' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Last quarter' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Year-end' />
          </ListItem>
        </>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
