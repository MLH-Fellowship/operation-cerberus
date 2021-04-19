import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

// Generate Order Data
// function createData(id, date, name, shipTo, amount, paid) {
//   return { id, date, name, shipTo, amount, paid };
// }
function createData(id, date, name) {
  return { id, date, name};
}

const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 312.44, true),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 866.99, true),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 100.81, false),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 654.39, true),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     212.79,
//     false
//   )

];

export default function Uploads({files, sliceDate}) {
    const uploads = files.map((f) => createData(f.id, f.uploaded_on, f.filename))

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Uploaded On</TableCell>
          <TableCell>Name</TableCell>
          {/* <TableCell>Uplaoded </TableCell>
          <TableCell>Travel Cost</TableCell>
          <TableCell align='right'>Paid?</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {uploads.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{sliceDate(row.date)}</TableCell>
            <TableCell>{row.name}</TableCell>
            {/* <TableCell>{row.shipTo}</TableCell>
            <TableCell>$ {row.amount}</TableCell>
            <TableCell align='right'>
              <Checkbox size='small' readOnly checked={row.paid} />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
