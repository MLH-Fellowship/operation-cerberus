import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Stepper from '@material-ui/core/Stepper';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Chart from '../components/chart';
import Card from '../components/card';
import html2canvas from 'html2canvas';
// import useData from '../hooks/useData';
import Import from '../components/import';
import Visual from '../components/visual';
import Customize from '../components/customize';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Orders from '../components/recent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { pinChart } from '../redux/actions/chartActions';


const Explore = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [canProceed, setCanProceed] = useState(false);
    const [visual, setVisual] = useState(null);
    const [fileID, setFileID] = useState(null);
    const [title, setTitle] = useState('Visual Preview');
    const [xval, setXVal] = useState('');
    const [yval, setYVal] = useState('');
    const [fileData, setFileData] = useState({});
    const [flash, setFlash] = useState('');

    // dispatch for chart
    const dispatch = useDispatch();
    const chart = useSelector(state => state.chart);

    const chartRef = useRef(null);
    const link = useRef(null);
    const final = useRef(null);
    const theme = useTheme();
    // const data = useData([], []);

    useEffect(() => {
        if (Object.keys(chart).length > 0 && chart.success === true) {
            setFlash('success');
            setTimeout(() => {
                setFlash('');
            }, 3000)
        }
    }, [chart])

    const chartChange = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case 'visual':
                return setVisual(value);
            case 'chart-title':
                if (!value.trim()) {
                    return setTitle('Visual Preview');
                } else {
                    return setTitle(value);
                }
            case 'xval':
                return setXVal(value);
            case 'yval':
                return setYVal(value);
        }
    };

    const downloadChart = () => {
        const content = chartRef.current.children[0].children[0];
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

    const pinOverview = () => {
        // store fileData in redux store
        dispatch(pinChart(fileData, title));
    }

    const allowNext = (bool) => {
        setCanProceed(bool);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
        setCanProceed(false);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const useStyles = makeStyles((theme) => ({
        dataGrid: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
        },
        select: {
        minWidth: 150
        },
        spacing: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
        },
        stepper: {
        backgroundColor: 'inherit'
        },
        buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(3)
        },
        button: {
        marginRight: theme.spacing(2)
        },
        resetButton: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(3)
        },
        paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(3)
        },
        container: {
        marginBottom: theme.spacing(3)
        }
    }));
    const classes = useStyles();

    // for the "steps" in the 'explore' process: 1. import data, 2. select visual, 3. customize
    const steps = [
        {
            label: 'Import data',
            content: <Import {...{ allowNext, setFileID, setFileData }} />
        },
        // { label: 'Join sets', content: <Join {...{ allowNext }} /> },
        {
            label: 'Select visual',
            content: (
                <Visual {...{ chartChange, xval, yval, visual, allowNext, fileID }} />
            )
        },
        {
            label: 'Customize',
            content: <Customize {...{ chartChange, fileID }} />
        }
    ];

    return (
        <Layout title='Explore'>
            <div ref={final} />
            <Container maxWidth='md' className={classes.container}>
                { flash && flash === 'success' ?
                    <h3>
                        Graph pinned!
                    </h3>
                : null}
                <Paper className={classes.paper}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(({ label }) => {
                    return (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>

                {steps[activeStep].content}

                <div className={classes.buttonGroup}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        className={classes.button}
                        disabled={!canProceed}
                    >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
                </Paper>

                <div ref={chartRef}>
                {visual && activeStep > 0 && (
                    <Zoom in={true}>
                        
                        <Card
                            header={title}
                            content={<Chart data={fileData} type={visual} />}
                            // content={<Chart {...{  fileData, type: visual }} />}
                        />
                    </Zoom>
                )}
                </div>

                {visual && activeStep === 2 && (
                <Grid
                    justify='center'
                    container
                    className={classes.spacing}
                    spacing={3}
                >
                    <Grid item>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={downloadChart}
                    >
                        Download
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button 
                        color='primary'
                        onClick={pinOverview}
                    >
                        Pin to Overview
                    </Button>
                    </Grid>

                    <a ref={link} />
                </Grid>
                )}
            </Container>
        </Layout>
    );
};

export default Explore;
