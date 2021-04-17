import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Layout from '../components/layout';
import { authenticateUser } from "../api";

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const getStatus = async (jwt) => {
        try {
            await axios
                .get(`http://localhost:5000/auth/status`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
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

    // run once to authenticate Admin
    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('user'));
        console.log(info);
        getStatus(info.token);
        // console.log(admin);
    }, []);

    useEffect(() => {
        console.log('rendered');
        console.log(admin);
    }, [admin])

    if (!loading) {
        if (admin) {
            return (
                <Layout>
                    <h1>Welcome Admin!</h1>
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