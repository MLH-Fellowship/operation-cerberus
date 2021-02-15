import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Progress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const Import = ({ allowNext, setFileID }) => {
  const [file, setFile] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    allowNext(false);
  }, []);

  const deleteFile = (k) => {
    const newF = file.filter((file, key) => key !== k);
    setFile(newF);
  };

  const tryAgain = () => {
    setResult(null);
    setFile([]);
  };

  const importFiles = () => {
    setLoading(true);

    // setTimeout(() => {
    //   setLoading(false);
    //   setResult({
    //     severity: 'success',
    //     message: `File successfully imported.`
    //   });
    //   allowNext(true);
    // }, 3500);
    const formData = new FormData();
    file.map(({ file }) => {
      return formData.append(file.name, file, file.name);
    });

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data'
      },
      body: formData
    })
      .then((res) => {
        res.json().then(({ status, uploads, id }) => {
          setLoading(false);
          if (status === 'success') {
            setResult({
              severity: 'success',
              message: `${uploads} file(s) successfully imported.`
            });
            setFileID(id);
            allowNext(true);
          } else {
            setResult({
              severity: 'warning',
              message: 'File import failed, please try again.'
            });
          }
        });
      })
      .catch((e) => {
        setLoading(false);
        setResult({
          severity: 'error',
          message:
            'A critical error has occurred, please contact an administrator.'
        });
      });
  };

  const selectFiles = (files) => {
    setFile(files);
  };

  const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none'
    },
    spacing: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    chip: {
      margin: theme.spacing(0.75)
    },
    bottom: {
      marginTop: theme.spacing(3)
    }
  }));

  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
      <Typography component='p'>
        Upload a data file below to import it into the Echelon system. Valid
        file types include .xlsx, .csv, and .json.
      </Typography>

      <Grid container justify='center' className={classes.spacing}>
        {file?.length > 0 && !result && (
          <>
            {file.map(({ file }, key) => (
              <Chip
                size='medium'
                label={file.name}
                onDelete={() => deleteFile(key)}
                className={classes.chip}
                key={key}
              />
            ))}
            {file?.length > 5 && (
              <Chip
                size='medium'
                label='Clear all'
                onDelete={() => setFile([])}
                className={classes.chip}
                color='secondary'
                key={'del'}
              />
            )}
          </>
        )}

        {!file?.length && (
          <DropzoneAreaBase
            onAdd={selectFiles}
            filesLimit={1}
            dropzoneText='Drag file here or click to select'
            showAlerts={['error']}
          />
        )}

        {file?.length > 0 && !loading && !result && (
          <Grid container justify='center' className={classes.bottom}>
            <Button
              variant='contained'
              color='primary'
              component='span'
              onClick={importFiles}
            >
              Upload
            </Button>
          </Grid>
        )}

        {loading && (
          <Grid container justify='center' className={classes.bottom}>
            <Progress color='secondary' />
          </Grid>
        )}

        {result && (
          <Grow in={Boolean(result)}>
            <Alert
              severity={result?.severity}
              action={
                result?.severity === 'warning' && (
                  <Button color='inherit' size='small' onClick={tryAgain}>
                    Retry
                  </Button>
                )
              }
            >
              {result?.message}
            </Alert>
          </Grow>
        )}
      </Grid>
    </Container>
  );
};

export default Import;
