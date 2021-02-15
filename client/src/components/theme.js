import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import usePrimary from '../hooks/usePrimary';
import useSecondary from '../hooks/useSecondary';
import useTheme from '../hooks/useTheme';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const Theme = ({ children }) => {
  const [primary, setPrimary] = usePrimary();
  const [secondary, setSecondary] = useSecondary();
  const [mode, modeToggle] = useTheme();

  const getPrimary = () => {
    if (primary !== 'def') {
      return primary;
    } else {
      if (mode === 'dark') {
        return blue[300];
      } else {
        return blue.A700;
      }
    }
  };

  const getSecondary = () => {
    if (secondary !== 'def') {
      return secondary;
    } else {
      if (mode === 'dark') {
        return pink[200];
      } else {
        return pink.A200;
      }
    }
  };

  const theme = createMuiTheme({
    palette: {
      type: mode,
      primary: {
        main: getPrimary()
      },
      secondary: {
        main: getSecondary()
      }
    }
  });

  return (
    <ThemeProvider {...{ theme }}>
      <CssBaseline />
      {React.cloneElement(children, {
        ...{ mode, modeToggle, setPrimary, setSecondary }
      })}
    </ThemeProvider>
  );
};

export default Theme;
