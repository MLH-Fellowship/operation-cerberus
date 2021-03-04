import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
        display: 'flex',
        alignContent: 'center',
        border: '1px solid black'
  }
}));

export default function SignUpUser() {
  const classes = useStyles();
  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: false,
  };
  const [user, setUser] = useState(initialUser);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="standard-required"
          label="First name"
          defaultValue=""
        />
        <TextField
          required
          id="standard-required"
          label="Last name"
          defaultValue=""
        />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
        />
        <TextField
          required
          id="standard-password-input"
          label="Retype password"
          type="password"
        />
        <TextField required id="standard-email-input" label="Email" />
        <Box>
            <FormControlLabel
            control={
                <Checkbox
                checked={user.admin}
                onChange={handleChange}
                name="admin"
                color="primary"
                />
            }
            label="Admin"
            />
        </Box>
      </div>
      <Box display="flex" justifyContent="center" p={3}>
        <Button variant="contained" color="primary" type="submit" value="Submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}
