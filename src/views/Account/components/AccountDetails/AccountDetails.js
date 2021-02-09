import React, { useState } from 'react';
import axios from 'axios';
import authHeader from 'services/auth-header';
import clsx from 'clsx';
import { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import CircularStatic from '../../../../layouts/static layout/CircularStatic';
class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      firstName: '',

    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUserDetails();

  }

  handleChange(event) {
    this.setState({ firstName: event.target.value });
  }

  getUserDetails = _ => {
    const userNamesession = JSON.parse(localStorage.getItem('user'));
    fetch('https://mocbackend.cleverapps.io/api/user/listByUsername/' + userNamesession.username)
      .then(response => response.json())
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err))
  }


  UpdateUserProfile(FirstName, LastName, email, PhoneNumber, Adresse, Adresse2, country, PostalCode) {
    const userNamesession = JSON.parse(localStorage.getItem('user'));

    const baseUrl = "https://mocbackend.cleverapps.io/api/user/updateProfile/" + userNamesession.id
    const datapost = {
      FirstName: FirstName,
      LastName: LastName,
      email: email,
      PhoneNumber: PhoneNumber,
      Adresse: Adresse,
      Adresse2: Adresse2,
      Country: country,
      PostalCode: PostalCode

    }

    axios.post(baseUrl, datapost, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
         // alert(response.data.message)

        }
        else {
          alert("Error when updating data")

        }
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
  }



  render() {


    return (
      <React.Fragment>
        <Card>


          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >

              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {

                  return (
                    <TextField
                      id="firstName2"
                      fullWidth
                      helperText=""
                      label="First name"
                      margin="dense"
                      name="firstName"
                      required
                      defaultValue={user.FirstName}
                      variant="outlined"
                    />)
                })}

              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="lastName2"
                      fullWidth
                      label="Last name"
                      margin="dense"
                      name="lastName"

                      required
                      defaultValue={user.LastName}
                      variant="outlined"
                    />)
                })}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="email"
                      fullWidth
                      label="Email Address"
                      margin="dense"
                      name="email"
                      disabled
                      required
                      defaultValue={user.email}
                      variant="outlined"
                    />)
                })}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="phone"
                      fullWidth
                      label="Phone Number"
                      margin="dense"
                      name="phone"
                      defaultValue={user.PhoneNumber}
                      variant="outlined"
                    />)
                })}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="adresse"
                      fullWidth
                      label="Adresse 1"
                      margin="dense"
                      name="adresse"

                      required

                      // eslint-disable-next-line react/jsx-sort-props

                      defaultValue={user.Adresse}
                      variant="outlined"
                    />)
                })}



              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="adresse2"
                      fullWidth
                      label="Adresse 2"
                      margin="dense"
                      name="adresse2"

                      required

                      // eslint-disable-next-line react/jsx-sort-props

                      defaultValue={user.Adresse2}
                      variant="outlined"
                    />)
                })}



              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  console.log(document.getElementById("country"));
                  

                  return (
                    <TextField
                      id="country"
                      fullWidth
                      label="Country"
                      margin="dense"
                      name="country"
                      
                      required
                      defaultValue={user.Country}
                      variant="outlined"
                    >
                       
                    </TextField>


                  )
                })}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {this.state.data.map(function (user) {
                  return (
                    <TextField
                      id="PostalCode"
                      fullWidth
                      label="Postal Code"
                      name="PostalCode"

                      required
                      defaultValue={user.PostalCode}
                      variant="outlined"
                    />)
                })}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions style={{float: 'right'}}>
            <Button
             
              

              // onClick={()=>this.UpdateUserProfile(this.state.FirstName,"test","maher.moussa90@yahoo.fr","93525096","mahdia","Adresse2","FR","5146")}
              onClick={() => this.UpdateUserProfile(document.getElementById('firstName2').value, document.getElementById('lastName2').value, document.getElementById('email').value, document.getElementById('phone').value, document.getElementById('adresse').value, document.getElementById('adresse2').value, document.getElementById('country').value, document.getElementById('PostalCode').value)}
            // onClick={()=>this.saveChangedInformation()}
            >
              <CircularStatic></CircularStatic>
          </Button>
          </CardActions>

        </Card>
      </React.Fragment>


    )

  }


}

export default AccountDetails;
