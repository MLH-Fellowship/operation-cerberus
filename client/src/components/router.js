import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
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
import Admin from "../pages/admin";

import { connect } from 'react-redux';
import {
  OpenDrawerAction,
  CloseDrawerAction,
} from '../redux/actions/openDrawerAction';

const Router = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        refreshToken();
    }, [])

    const refreshToken = async () => {
        try {
            await axios
                .post(`http://localhost:5000/auth/refresh_token`, {}, {withCredentials: true})
                .then((res) => {
                    // console.log(res.data.data.admin);
                    // setAdmin(res.data.data.admin);
                    console.log(res.data);
                    dispatch(res.data.auth_token);
                    // setLoading(false);
                })
                .catch((err) => {
                    return err;
                });
        } catch(err) {
            console.log(err);
        }
    }

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
                <ProtectedRoute exact path='/admin-portal' component={Admin} />
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
