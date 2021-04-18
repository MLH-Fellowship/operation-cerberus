import React, { useEffect } from 'react';
import Router from './components/router';
import Theme from './components/theme';

import "./static/sass/main.scss";

const App = () => {
    // useEffect(() => {

    // }, [])
  return (
    <Theme>
      <Router />
    </Theme>
  );
};

export default App;
