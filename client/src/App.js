import React from 'react';
import Router from './components/router';
import Theme from './components/theme';

import "./static/sass/main.scss";

const App = () => {
  return (
    <Theme>
      <Router />
    </Theme>
  );
};

export default App;
