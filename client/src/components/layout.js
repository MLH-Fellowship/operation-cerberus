import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomAppBar from './customAppBar';
import '../assets/styles/layout.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(5),
  },
}));

const Layout = ({ children, title, thin }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomAppBar title={title} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={thin ? 'sm' : 'lg'} className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
