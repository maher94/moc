import { Component } from "react";
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class WaitingValidation extends Component {

  state = {
    nbProduct: 0,
    nbLenses: 0,

  }
  componentDidMount() {
    this.nbLensesCount();
    this.nbProductCount()

  }
  nbLensesCount = () => {
    const userId = JSON.parse(localStorage.getItem('user'));

    if (userId == null) {
      alert("please sign in before");
      return <Redirect to="/not-found" />

    }
    axios.get('https://mocbackend.cleverapps.io/ordersLentille/countLensesOrdersByStatus/' + userId.id + '/' + "WaitingValidation")
      .then(response => this.setState({ nbLenses: response.data.data[0].nb })

      )
      .catch(function (error) {

        console.log(error);
      })

  };
  nbProductCount = () => {
    const userId = JSON.parse(localStorage.getItem('user'));


    axios.get('https://mocbackend.cleverapps.io/ordersProduit/countProductOrdersByStatus/' + userId.id + '/' + "WaitingValidation")
      .then(response => this.setState({ nbProduct: response.data.data[0].nb })

      )
      .catch(function (error) {

        console.log(error);
      })

  };
  render() {
    return (
      <Card >
        <CardContent>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                style={{ fontWeight: 700 }}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >Waiting Validation
                </Typography>
              <Typography variant="h6"> Lenses   : {this.state.nbLenses}</Typography>
              <Typography variant="h6">Product : {this.state.nbProduct}</Typography>
            </Grid>
            <Grid item>
              <Avatar style={{ backgroundColor: "#FBF269", height: 40, width: 40 }}>
                <AssignmentTurnedInIcon style={{ height: 32, width: 32 }} />
              </Avatar>
            </Grid>
          </Grid>


        </CardContent>
      </Card>
    );
  };


}
export default WaitingValidation;