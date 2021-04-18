import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Layout from '../components/layout';
import User from '../components/user';
import CreateUser from "../components/createUser";
import { createUserCreator, deleteUser } from "../redux/actions/storeUserInfoAction";
import { authenticateUser } from "../api";

const Admin = () => {
    const dispatch = useDispatch();
    const newUser = useSelector(state => state.createdUser);

    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [createStatus, setCreateStatus] = useState(false);

    const getStatus = async (jwt) => {
        try {
            await axios
                .get(`http://localhost:5000/auth/status`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    // console.log(res.data.data.admin);
                    setAdmin(res.data.data.admin);
                    setLoading(false);
                })
                .catch((err) => {
                    return err;
                });
        } catch(err) {
            console.log(err);
        }
    }

    const getAllUsers = async (jwt) => {
        try {
            await axios
                .get(`http://localhost:5000/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    setUsers(res.data.users);
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch(err) {
            console.log(err);
        }
    }

    // run once to authenticate Admin
    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('user'));
        getStatus(info.token);
        getAllUsers(info.token);
        // console.log(admin);
    }, []);

    useEffect(() => {
        // const info
        const info = JSON.parse(localStorage.getItem('user'));
        getAllUsers(info.token);

        // set flash message
        if (newUser.message === "success") {
            setCreateStatus(newUser.message);
            setTimeout(() => {
                setCreateStatus('');
            }, 3000)
        } else {
            setCreateStatus(newUser.message);
            setTimeout(() => {
                setCreateStatus('');
            }, 3000)
        }
    }, [newUser])

    useEffect(() => {
        // console.log('rendered');
        // console.log(admin);
        // console.log(users);
    }, [admin, users])

    const handleCreateUser = (e) => {
        e.preventDefault();
        setShowCreate(true);
    }

    const handleCancel = (e) => {
        setShowCreate(false);
    }

    const handleDelete = (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        dispatch(deleteUser(token, id));
    }

    const handleSubmitUser = (email, password, isAdmin) => {
        console.log(createUserCreator);
        setShowCreate(false);
        dispatch(createUserCreator(email, password, isAdmin));
    }

    if (!loading) {
        if (admin) {
            return (
                <Layout>
                    <h1>Welcome Admin!</h1>
                    {createStatus === "success" ? <h3>User created!</h3> : null}
                    <div className="cards">
                        {users && loading === false
                            ? users.map((user) => <User {...user} admin={user.admin} userID={user.user_id} registeredOn={user.registered_on} handleDelete={handleDelete}/>)
                            : null
                        }
                        {showCreate && 
                            <CreateUser
                                handleSubmitUser={handleSubmitUser} 
                                handleCancel={handleCancel}
                            />
                        }
                    </div>
                    <div>
                        <button
                            className="btn btn--publish font-small" 
                            style={{marginTop: "2rem"}} 
                            onClick={handleCreateUser}
                        >
                            Create User
                        </button>
                    </div>
                </Layout>
            )
        } else {
            return <Redirect to='/404' />;
        }
    } else {
        return null;
    }
};

export default Admin;