import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chart from './chart';
import Deposits from './withdrawals';
import Orders from './recent';
import Card from './card';
import useData from '../hooks/useData';

const Dashboard = () => {
  const data = useData();
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          <Card
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
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card header='Recent Withdrawal' content={<Deposits />} seeMore='#' />
        </Grid>

        <Grid item xs={12}>
          <Card header='Recent Dispatches' content={<Orders />} seeMore={'#'} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
