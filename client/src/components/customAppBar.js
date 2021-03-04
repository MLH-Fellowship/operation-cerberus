import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/MoreVert';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import OpenDrawerContext from './drawerContext';
import clsx from 'clsx';
import { logout } from '../services/authService';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, Link } from 'react-router-dom';

const listItems = [
  { to: '/explore', title: 'Explore', icon: <ExploreIcon /> },
  { to: '/settings', title: 'Settings', icon: <SettingsIcon /> },
];

const CustomAppBar = ({ title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const setOpen = React.useContext(OpenDrawerContext);

  const MenuItem = ({ to, title, icon }) => {
    const [selected, setSelected] = React.useState(false);
    return (
      <NavLink to={to} isActive={(match) => setSelected(Boolean(match))} exact>
        <ListItem selected={selected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </NavLink>
    );
  };

  const openProfileMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: 36,
    },
    title: {
      flexGrow: 1,
    },
    activeRoute: {
      color: theme.palette.secondary.main,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={setOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h2'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>

          <Tooltip title='Home'>
            <Link to='/'>
              <IconButton color='inherit'>
                <HomeIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <IconButton color='inherit' onClick={openProfileMenu}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeProfileMenu}
      >
        {listItems.map(({ ...fields }, key) => (
          <MenuItem {...fields} key={key} />
        ))}
        <ListItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </Menu>
    </>
  );
};

export default CustomAppBar;
