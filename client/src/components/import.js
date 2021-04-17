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
import reformatData from '../hooks/reformatData';

const Import = ({ allowNext, setFileID, setFileData }) => {
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

    const importFiles = async () => {
        setLoading(true);
        const formData = new FormData();
        file.map(({ file }) => {
            return formData.append(file.name, file, file.name);
        });

        // upload file
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
        
        const txt = await file[0].file.text();
        function CSVToArray( strData, strDelimiter ) {
            // Check to see if the delimiter is defined. If not,
            // then default to comma.
            strDelimiter = (strDelimiter || ",");
    
            // Create a regular expression to parse the CSV values.
            var objPattern = new RegExp(
                (
                    // Delimiters.
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    
                    // Quoted fields.
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    
                    // Standard fields.
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
                );
    
    
            // Create an array to hold our data. Give the array
            // a default empty first row.
            var arrData = [[]];
    
            // Create an array to hold our individual pattern
            // matching groups.
            var arrMatches = null;
    
    
            // Keep looping over the regular expression matches
            // until we can no longer find a match.
            while (arrMatches = objPattern.exec( strData )){
    
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[ 1 ];
    
                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (
                    strMatchedDelimiter.length &&
                    strMatchedDelimiter !== strDelimiter
                    ){
    
                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push( [] );
    
                }
    
                var strMatchedValue;
    
                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[ 2 ]){
    
                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    strMatchedValue = arrMatches[ 2 ].replace(
                        new RegExp( "\"\"", "g" ),
                        "\""
                        );
    
                } else {
    
                    // We found a non-quoted value.
                    strMatchedValue = arrMatches[ 3 ];
    
                }
    
    
                // Now that we have our value string, let's add
                // it to the data array.
                arrData[ arrData.length - 1 ].push( strMatchedValue );
            }
    
            // Return the parsed data.
            return( arrData );
        }
        const data = CSVToArray(txt, ",");
        console.log(data);
        let firstCol = [], secondCol = [];
        let amt;
        for (let i in data) {
            if (i > 0 && i < data.length - 1) {
                firstCol.push(data[i][0]);
                amt = data[i][1].replace(",", "");
                secondCol.push(parseFloat(amt));
                // secondCol.push(parseFloat(data[i][1].substring(1).replace(",", "")));
            }
        }
        // update file data state
        const first = file[0].file.name.split('_')[0], last = file[0].file.name.split('_')[1];
        setFileData((reformatData(firstCol, secondCol, first, last)));
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
                    }>
                        {result?.message}
                    </Alert>
                </Grow>
                )}
            </Grid>
        </Container>
    );
};

export default Import;
