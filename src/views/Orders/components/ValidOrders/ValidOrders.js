import { Component } from "react";
import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import axios from 'axios';
import Done from '@material-ui/icons/Done';

class ValidOrders extends Component {

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


    axios.get('http://localhost:4000/ordersLentille/countLensesOrdersByStatus/' + userId.id + '/' + "Validated")
      .then(response => this.setState({ nbLenses: response.data.data[0].nb })

      )
      .catch(function (error) {

        console.log(error);
      })

  };
  nbProductCount = () => {
    const userId = JSON.parse(localStorage.getItem('user'));


    axios.get('http://localhost:4000/ordersProduit/countProductOrdersByStatus/' + userId.id + '/' + "Validated")
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
              >
                Validated Orders
            </Typography>
              <Typography variant="h6"> Lenses   : {this.state.nbLenses}</Typography>
              <Typography variant="h6">Product : {this.state.nbProduct}</Typography>

            </Grid>
            <Grid item>
              <Avatar style={{ backgroundColor: "#259E1A", height: 40, width: 40 }}>
                <Done style={{ height: 32, width: 32 }} />
              </Avatar>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    );
  };



}
export default ValidOrders;