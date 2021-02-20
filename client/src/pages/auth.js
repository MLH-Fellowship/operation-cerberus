import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getCurrentUser, login } from '../services/authService';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.primary.main
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        }
    }));

    const classes = useStyles();
    const user = getCurrentUser();

    const loginHandler = (event) => {
        event.preventDefault();
        login(email, password);
    }

    if (user) {
        return <Redirect to='/' />;
    } else {
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Log in to{' '}
                        <Typography component='span' variant='span' color='secondary'>
                            Echelon
                        </Typography>
                    </Typography>
                    <form
                        // method="POST"
                        onSubmit={loginHandler}
                        className={classes.form}
                    >
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='userid'
                            label='User ID'
                            name='userid'
                            autoComplete='userid'
                            autoFocus
                            onChange={email => setEmail(email)}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={password => setPassword(password)}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='secondary' />}
                            label='Remember me'
                        />
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            type="submit"
                            // type="submit"
                        >
                            Log In
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
};

export default Auth;
