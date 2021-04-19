import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chart from './chart';
import Uploads from './uploads';
import Deposits from './withdrawals';
import Orders from './recent';
import Card from './card';
import useData from '../hooks/useData';
import reformatData from "../hooks/reformatData";
// import file from "../../../uploads/fiscal_2020.csv";

const Dashboard = () => {
    const [front, setFront] = useState(null);
    const [files, setFiles] = useState([])
    const data = useData();
    const chart = useSelector(state => state.chart);
    //   const chart = {};

    const fetchFiles = async (token) => {
        try {
            const headers = {
                "Authorization": `Bearer ${token}`,
            }
            const { data } = await axios.get(`http://localhost:5000/files`, {headers});
            setFiles(data.files)
        } catch(err) {
            console.log(err);
        }
    }

    const readFile = async () => {
    }

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

    const updateVisual = async () => {
        try {
            const info = JSON.parse(localStorage.getItem('user'));
            const headers = {
                "Authorization": `Bearer ${info.token}`,
            }
            console.log(files);
            const res = await axios.get(`http://localhost:5000/files/${files[files.length - 1].id}`, {headers});
            const data = CSVToArray(res.data.fileContents, ",");

            let firstCol = [], secondCol = [];
            let amt;
            for (let i in data) {
                if (i > 0 && i < data.length - 1) {
                    firstCol.push(data[i][0]);
                    amt = data[i][1].replace(",", "");
                    secondCol.push(parseFloat(amt));
                }
            }

            // update file data state
            const fname = files[files.length - 1].filename;
            const first = fname.split('_')[0], last = fname.split('_')[1];
            // const first = file[0].file.name.split('_')[0], last = file[0].file.name.split('_')[1];
            setFront(reformatData(firstCol, secondCol, first, last));
        } catch(err) {
            console.log(err);
        }
    }

    // get uploaded files by user
    useEffect(() => {
        // fetch files by user
        const info = JSON.parse(localStorage.getItem('user'));
        fetchFiles(info.token);
    }, []);

    // get and display most recently uploaded file
    useEffect(() => {
        if (files.length > 0) {
            updateVisual();
        }
    }, [files])

    const rows = [
        {
            "filename": "fiscal_2020.csv",
            "uploaded_on": "Sun, 18 Apr 2021 16:32:59 GMT"
        },
        {
            "filename": "fiscal_2019.csv",
            "uploaded_on": "Sun, 18 Apr 2021 16:34:20 GMT"
        }
    ];

    const sliceDate = (date) => `${date.slice(8, 11)} ${date.slice(5, 7)} ${date.slice(12, 17)}`;
    const name = files.length > 0 ? files[files.length - 1]['filename'] : 'None';
    const date = files.length > 0 ? sliceDate(files[files.length - 1]['uploaded_on']) : 'None';

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
            {front != null ?
                <Card
                    header="Most recently uploaded"
                    content={<Chart data={{labels: front.labels, datasets: front.datasets}}/>}
                    seeMore={'#'}
                    second={
                        <Button color='secondary' size='small'>
                            Edit
                        </Button>
                    }
                    graph
                />
            :
            Object.keys(chart).length > 0 ? (
                <Card
                    header={chart.chartDetails.title}
                    content={<Chart data={{labels: chart.chartDetails.labels, datasets: chart.chartDetails.datasets}}/>}
                    seeMore={'#'}
                    second={
                        <Button color='secondary' size='small'>
                            Edit
                        </Button>
                    }
                    graph
                />
            ) : <Card
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
        }
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
            {/* <Card header='Recent Withdrawal' content={<Deposits />} seeMore='#' /> */}
          <Card header='Most Recent Upload' content={<Deposits name={name} date={date}/>}/>
        </Grid>

        <Grid item xs={12}>
          <Card header='Recent Uploads' content={<Uploads files={files} sliceDate={sliceDate}/>} seeMore={'#'} />
        </Grid>

        <Grid item xs={12}>
          <Card header='Recent Dispatches' content={<Orders />} seeMore={'#'} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
