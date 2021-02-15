import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { BlockPicker } from 'react-color';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const PickerItem = ({ type, set }) => {
  const theme = useTheme();
  const [anchor, setAnchor] = React.useState(null);
  const [color, setColor] = React.useState(
    type === 'primary'
      ? theme.palette.primary.main
      : theme.palette.secondary.main
  );
  const openPopover = (e) => {
    setAnchor(e.currentTarget);
  };

  const changeColor = ({ hex }) => {
    setColor(hex);
    set(hex);
  };

  const useStyles = makeStyles((thm) => ({
    settingItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: thm.spacing(0.75)
    },
    swatch: {
      borderRadius: 2,
      height: 20,
      width: 25,
      alignSelf: 'center',
      cursor: 'pointer',
      backgroundColor: color
    }
  }));

  const classes = useStyles();
  const label = type === 'primary' ? 'Primary color' : 'Secondary color';

  return (
    <div className={classes.settingItem}>
      <Typography>{label}</Typography>
      <div className={classes.swatch} onClick={openPopover} />
      <Popover
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <BlockPicker color={color} onChange={changeColor} />
      </Popover>
    </div>
  );
};

export default PickerItem;
