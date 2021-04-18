import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Layout from '../components/layout';
import User from '../components/user';
import { authenticateUser } from "../api";

const Admin = () => {
    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

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
        console.log(info);
        getStatus(info.token);
        getAllUsers(info.token);
        // console.log(admin);
    }, []);

    useEffect(() => {
        console.log('rendered');
        console.log(admin);
        console.log(users);
    }, [admin, users])

    if (!loading) {
        if (admin) {
            return (
                <Layout>
                    <h1>Welcome Admin!</h1>
                    <div className="cards">
                        {users && loading === false
                            ? users.map((user) => <User {...user} admin={user.admin} userID={user.user_id} registeredOn={user.registered_on}/>)
                            : null
                        }
                    </div>
                    <div>
                        <button
                            className="btn btn--publish font-small" 
                            style={{marginTop: "2rem"}} 
                        >Create User</button>
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