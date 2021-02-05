import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from 'axios';
import * as OrderAPI from 'views/Orders/OrderManagement/api/OrderAPI';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  progress: {
    marginTop: theme.spacing(3)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.warning.light,
    height: 40,
    width: 40
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.warning.light
  },
  differenceValue: {
    color: theme.palette.warning.light,
    marginRight: theme.spacing(1)
  }
}));
 
const nbs =_ =>{
  axios.get('http://localhost:4000/ordersLentille/countLensesOrdersByStatus/' +2+'/'+"WaitingValidation", )
  .then(response => response.data.data[0].nb )   
  
  .catch(function (error) {

    console.log(error);
  })
  


}

const WaitingValidation = props => {
  const { className, ...rest } = props;
  const nbrs=nbs();
  const classes = useStyles();
  const nbr = nbs() ;
  console.log(nbr)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >Waiting Validation
            </Typography>
            
            <Typography variant="h6">{OrderAPI.getCountNborders("Produit")}</Typography>
            <Typography variant="h6">{"nb "+ nbrs}</Typography>

          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AssignmentTurnedInIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>


      </CardContent>
    </Card>
  );
};

WaitingValidation.propTypes = {
  className: PropTypes.string
};

export default WaitingValidation;
