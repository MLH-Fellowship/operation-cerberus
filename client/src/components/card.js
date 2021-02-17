import React from 'react';
import MCard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const Card = ({ header, content, seeMore, second, graph }) => {
  const link = React.useRef(null);
  const cardContent = React.useRef(null);
  const [display, setDisplay] = React.useState(false);
  const theme = useTheme();

  const saveCard = () => {
    const content = cardContent.current;
    content.style.backgroundColor = theme.palette.background.paper; // fixes background staying white on dark mode

    html2canvas(content).then((canvas) => {
      link.current.setAttribute(
        'download',
        `${content.children[0].innerText}.png`
      );
      link.current.setAttribute(
        'href',
        canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      );

      link.current.click();
    });
  };

  const useStyles = makeStyles(() => ({
    card: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      minWidth: 275,
    },
    saveButton: {
      marginLeft: 'auto',
    },
  }));

  const classes = useStyles();

  return (
    <MCard
      className={classes.card}
      onMouseOver={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <CardContent ref={cardContent}>
        <Typography color='textSecondary' gutterBottom>
          {header}
        </Typography>
        {content}
      </CardContent>
      <CardActions>
        {seeMore && (
          <Link to={seeMore}>
            <Button size='small' color='primary'>
              More
            </Button>
          </Link>
        )}
        {second}
        {display && graph && (
          <>
            <Tooltip title='Download' style={{ marginLeft: 'auto' }}>
              <IconButton
                size='small'
                onClick={saveCard}
                className={classes.saveButton}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        <a ref={link} />
      </CardActions>
    </MCard>
  );
};

export default Card;
