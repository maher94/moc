import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const updatePassword = (newpassword) => { 
  const userId = JSON.parse(localStorage.getItem('user'));
const datapost = {
  password : newpassword,
  email :userId.email
}
axios.post("http://localhost:4000/api/auth/updatePassword", datapost, {})
            .then(response => {
              if (response.data.success) {}
            }
            )
            .catch(error => {
                alert(error)
                console.log(error)
            })
          }
const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick= { updatePassword(values.password)}
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
