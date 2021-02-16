import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CustomDrawer from './customDrawer';
import { OpenDrawerProvider } from './drawerContext';
import ProtectedRoute from './protectedRoute';
import Auth from '../pages/auth';
import Home from '../pages/home';
import Travel from '../pages/travel';
import Accounting from '../pages/accounting';
import Reports from '../pages/reports';
import Integrations from '../pages/integrations';
import Explore from '../pages/explore';
import Settings from '../pages/settings';
import FourOhFour from '../pages/404';

import { connect } from 'react-redux';
import {
  OpenDrawerAction,
  CloseDrawerAction,
} from '../redux/actions/openDrawer';

const Router = (props) => {
  const handleDrawerOpen = () => {
    props.OpenDrawerAction();
  };

  const handleDrawerClose = () => {
    props.CloseDrawerAction();
  };

  return (
    <BrowserRouter>
      <CustomDrawer
        open={props.isOpen.isOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <OpenDrawerProvider value={handleDrawerOpen}>
        <Switch>
          <Route exact path='/auth' component={Auth} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/travel' component={Travel} />
          <ProtectedRoute exact path='/accounting' component={Accounting} />
          <ProtectedRoute exact path='/reports' component={Reports} />
          <ProtectedRoute exact path='/integrations' component={Integrations} />
          <ProtectedRoute exact path='/explore' component={Explore} />
          <ProtectedRoute
            exact
            path='/settings'
            component={() => <Settings {...props} />}
          />
          <ProtectedRoute path='*' component={FourOhFour} />
        </Switch>
      </OpenDrawerProvider>
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => ({
  isOpen: state.openDrawerReducer,
});

export default connect(mapStateToProps, {
  OpenDrawerAction,
  CloseDrawerAction,
})(Router);
