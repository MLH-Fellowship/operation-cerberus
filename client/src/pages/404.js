import React from 'react';
import Layout from '../components/layout';

const NotFoundPage = () => (
  <Layout title='Not found' thin>
    <h1>404: Not Found</h1>
    <p>
      This page doesn't exist. Please check that the URL is spelled correctly or
      contact an administrator if the issue persists.
    </p>
  </Layout>
);

export default NotFoundPage;
