import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chart from './chart';
import Uploads from './uploads';
import Deposits from './withdrawals';
import Orders from './recent';
import Card from './card';
import useData from '../hooks/useData';

const Dashboard = () => {
    const [files, setFiles] = useState([])
    const data = useData();
    const chart = useSelector(state => state.chart);
    //   const chart = {};

    const fetchFiles = async (token) => {
        try {
            const headers = {
                "Authorization": `Bearer ${token}`,
            }
            const { data } = await axios.get(`http://localhost:5000/files`, {headers});
            setFiles(data.files)
        } catch(err) {
            console.log(err);
        }
    }

    // get uploaded files by user
    useEffect(() => {
        // fetch files by user
        const info = JSON.parse(localStorage.getItem('user'));
        fetchFiles(info.token);
    }, []);

    const rows = [
        {
            "filename": "fiscal_2020.csv",
            "uploaded_on": "Sun, 18 Apr 2021 16:32:59 GMT"
        },
        {
            "filename": "fiscal_2019.csv",
            "uploaded_on": "Sun, 18 Apr 2021 16:34:20 GMT"
        }
    ];

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          {Object.keys(chart).length > 0 ? (
              <Card
                header={chart.chartDetails.title}
                content={<Chart data={{labels: chart.chartDetails.labels, datasets: chart.chartDetails.datasets}}/>}
                seeMore={'#'}
                second={
                    <Button color='secondary' size='small'>
                        Edit
                    </Button>
                }
                graph
              />
          ) : <Card
                header={'Travel Budget by Month'}
                content={<Chart data={data} type='line' />}
                seeMore={'#'}
                second={
                <Button color='secondary' size='small'>
                    Edit
                </Button>
                }
                graph
            />
          }
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
            {/* <Card header='Recent Withdrawal' content={<Deposits />} seeMore='#' /> */}
          <Card header='Most Recent Upload' content={<Deposits />}/>
        </Grid>

        <Grid item xs={12}>
          <Card header='Recent Uploads' content={<Uploads files={files}/>} seeMore={'#'} />
        </Grid>

        <Grid item xs={12}>
          <Card header='Recent Dispatches' content={<Orders />} seeMore={'#'} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
