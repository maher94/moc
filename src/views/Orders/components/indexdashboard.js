  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LentilleOrders from '../OrderManagement/components/LentilleOrders'
import LensesOrders from '../OrderManagement/components/LensesOrders'
import ProduitOrders from '../OrderManagement/components/ProduitOrders'
import  WaitingValidation  from './WaitingValidation';
import ValidOrders from './ValidOrders'
import RejectedOrders from './RejectedOrders'
import Price from './Price'
import { Grid } from '@material-ui/core';
import Price1 from './Prices1';
import ProductOrders from '../OrderManagement/components/ProductOrders';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  root: {
    padding: theme.spacing(4)
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
    },
  },
 
  buttons: {
    display: 'flex',
     
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  
 
   
}));



 

export default function Home() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  const [checked2, setChecked2] = React.useState(true);

  const handleChange2 = () => {
    setChecked2(prev => !prev);
  };
   
  return (
    <React.Fragment>
      
      <CssBaseline />
      
      <div className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={2}
          sm={4}
          xl={3}
          xs={6}
        >
          <WaitingValidation />
        </Grid>
        <Grid
          item
          lg={2}
          sm={4}
          xl={3}
          xs={6}
        >
          <ValidOrders />
        </Grid>
        <Grid
          item
          lg={2}
          sm={4}
          xl={3}
          xs={12}
        >
          <RejectedOrders />
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={6}
        >
          <Price1 />
        </Grid> 
        
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={6}
        >
          <Price />
        </Grid>
        
        
        
          
      </Grid>

     
    </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
           
          <React.Fragment>
            
              <React.Fragment>
             
                <div className={classes.buttons}>
                <Button
                    component={RouterLink}
                    to="/AddOrder"
                    variant="outlined"
                    color="secondary"

                    className={classes.button}
                  >
                   Add orders
                  </Button>
                  <FormControlLabel
                   className={classes.button}
                   
          control={
            
            <Switch checked={checked2} onChange={handleChange2} />
          }
          label=" Lenses"
        />
                  <FormControlLabel
                   className={classes.button}
                   
          control={
            
            <Switch checked={checked} onChange={handleChange} />
          }
          label=" Product"
        />
        
                </div>
               

              </React.Fragment>
            
          </React.Fragment>
        </Paper>
      
      </main>
      <div >
        
       <Zoom in={checked2}>
          <div elevation={20} className={classes.paper}>
          <LensesOrders></LensesOrders>
        
          </div>
        </Zoom>
        <Zoom in={checked}>
          <div elevation={20} className={classes.paper}>
          <ProductOrders></ProductOrders>
      
          </div>
        </Zoom>
        
        </div>

    </React.Fragment>
  );
}