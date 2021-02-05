import React, { Component } from 'react';
import { Button, Table, Select, Paper } from "@material-ui/core";
import "./TableOrder.css";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import * as OrderAPI from "../api/OrderAPI"
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import DeleteSweep from '@material-ui/icons/DeleteSweep'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
class OrderProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      Quantite: 1,
      id: 0,
      orderDate: new Date(),
      volume: "",
      comment: "",
      product: "Releasy",
      categorie: "Product",
      open: false,
      message: "",
      AQOfProduct :0
    };

    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleRowDelete = this.handleRowDelete.bind(this);
    this.handleRowAdd = this.handleRowAdd.bind(this);
    this.pushToCaller = this.pushToCaller.bind(this);
  }

  componentDidMount() {
    this.getStockProduct();
     
   
  }

  getStockProduct = _ => {
     
    fetch('http://localhost:4000/stock/getAQOfProduct')
      .then(response => response.json())
      .then(response => this.setState({ AQOfProduct:  response.availablequantity[0].availablequantity}))
      .catch(err => console.error(err))
  }
  handleQuantiteChange = (e) => {
    this.setState({
      Quantite: e.target.value
    }, this.pushToCaller);
  }
  handleCategorieChange = (e) => {
    this.setState({
      categorie: e.target.value
    }, this.pushToCaller);
    console.log(e.target.value)
  }
  handleProductChange = (e) => {
    this.setState({
      product: e.target.value
    }, this.pushToCaller);
    console.log(e.target.value)
  }
  handleVolumeChange = (e) => {
    this.setState({
      volume: e.target.value
    }, this.pushToCaller);
    console.log(e.target.value)
  }
  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    }, this.pushToCaller);

  }
  handleselectDateChange = (e) => {
    //let date= parseInt( e.getMonth()+1)+ "/"+parseInt(e.getDate() ) +"/"+e.getFullYear() ;
    //let today=new Date();
    //let date = new Date(e!=null?e.getFullYear():today.getFullYear(),e!=null? e.getMonth() :today.getMonth(), e!=null?e.getDate()+1:today.getDate()+1)
    this.setState({
      orderDate: new Date()
    }, this.pushToCaller);

    // console.log(date)
  }
  handlePrixChange = (e) => {
    this.setState({
      Prix: e.target.value
    }, this.pushToCaller);
  }

  pushToCaller = () => {
    this.handleRowChange(this.state.id, {
      Quantite: parseInt(this.state.Quantite, 10),
      categorie: this.state.categorie,
      product: this.state.product,
      orderDate: this.state.orderDate,
      volume: this.state.volume,
      comment: this.state.comment,

    });
  }
  saveData = () => {
    const userId = JSON.parse(localStorage.getItem('user'));
     
    this.state.rowData.forEach(order => {
      if (order.Quantite > 0) {
        OrderAPI.sendCreate(order.orderDate, order.categorie, order.product, "Draft", order.comment, order.Quantite, order.volume, "Produit", userId.id,  order.volume === "25 ML"?parseInt( order.Quantite * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40), 0, 0,  order.volume === "25 ML"?parseInt( order.Quantite * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40))
        this.setState({ message: "information Submited successfully with status Draft" })
      }
      else {
        this.setState({ message: "Please verify your data, you must added a quantity greater than 0" })
      }
    });

  }
  submitData = () => {
    const userId = JSON.parse(localStorage.getItem('user'));
    const price=0
    this.state.rowData.forEach(order => {
      
     
      if (order.Quantite > 0) {
        OrderAPI.sendCreate(order.orderDate, order.categorie, order.product, "WaitingValidation", order.comment, order.Quantite, order.volume, "Produit", userId.id, order.volume === "25 ML"?parseInt( order.Quantite * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40), 0, 0,  order.volume === "25 ML"?parseInt( order.Quantite * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40))
        this.setState({ message: "information saved successfully with status Waiting Validation" })
      }
      else {
        this.setState({ message: "Please verify your data, you must added a quantity greater than 0" })
      }
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true })

  };
  handleClose = () => {
    this.setState({ open: false })
  };
  render() {

    return (<div className="animated fadeIn">



      <div className="table">
        <div className="table-title">Create new Product Orders</div>
        <div className="table-content">
          <div className="table-header">
            <div className="table-row">
              <div className="table-data">
                <div>Category</div>

              </div>
              <div className="table-data">
                <div style={{ display: 'flex' }}>Products</div>

              </div>
              <div className="table-data">
                <div>Order date</div>
              </div>
              <div className="table-data">
                <div>Quantity</div>
              </div>
              <div className="table-data">
                <div>Volume </div>
              </div>
              <div className="table-data">
                <div>Comment</div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {this.state.rowData.map((index) =>

            <div className="table-row" key={index} id={index}   >



              <div className="table-data">
                <Select name="category" id="category"
                  defaultValue={'Product'}
                  onChange={this.handleCategorieChange} >

                  <MenuItem value={'Product'} displayEmpty>Product</MenuItem>

                </Select>
              </div>
              <div className="table-data">

                <Select
                  labelId="product"
                  id="product"
                  defaultValue={'Releasy'}
                  onChange={this.handleProductChange}
                >
                  <MenuItem value={'Releasy'}>Releasy</MenuItem>

                </Select>

              </div>
              <div className="table-data">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker

                    id="orderDate2"
                    format="MM/dd/yyyy"
                    //value={this.state.orderDate != "" ? this.state.orderDate : new Date()}
                    value={new Date()}
                    disabled
                    onChange={this.handleselectDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  /></MuiPickersUtilsProvider>
              </div>
              <div className="table-data">
                <TextField
                  id="quantity"
                  name="quantity"
                  type="number"
                  variant="outlined"
                  disabled={this.state.orderDate != new Date() ? false : true}
                  defaultValue={1}
                  value={this.state.rowData.Quantite}
                  onChange={this.handleQuantiteChange}
                  error={this.state.Quantite < 0 || this.state.Quantite == 0 ? true : false}
                />
              </div>
              <div className="table-data">
                <Select
                  name="volume"
                  data-id={index}
                  value={this.state.rowData.volume}
                  onChange={this.handleVolumeChange}
                  disabled={this.state.Quantite > 0 ? false : true}
                  error={this.state.volume == "" ? true : false}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="25 ML">25 ML</MenuItem>
                  <MenuItem value="50 ML">50 ML</MenuItem>
                  <MenuItem value="75 ML">75 ML</MenuItem>
                  <MenuItem value="100 ML">100 ML</MenuItem>

                </Select>
              </div>
              <div className="table-data">
                <TextField
                  multiline
                  rows={2}
                  rowsMax={4}
                  name="comment"
                  data-id={index}
                  type="text"
                  value={this.state.rowData.comment}
                  onChange={this.handleCommentChange}
                  error={this.state.comment.length > 30 ? true : false}
                />
              </div>



            </div>)}

          <div className="table-row" >


            <div className="table-data"><Button onClick={this.handleRowAdd} startIcon={
              <AddShoppingCart />
            } >Add new Order Line</Button> <Button onClick={this.handleRowDelete} active startIcon={
              <DeleteSweep />} >Delete Order Line</Button></div>
          </div>
        </div>

        <tfoot>
          <tr>

          </tr>
        </tfoot>

      </div>

      <Container maxWidth="xs" >
        <center>
          <label style={{ color: 'red' }}> Please check if all values are correct</label><br></br>
          <label style={{ color: 'red' }}>The comment length should be between 0 and 30 characters</label>
          <Paper style={{ paddingTop: 5, paddingBottom: 5 }}>
            <Button
              size="small" style={{
                font: '#0069d9',
                borderColor: 'red',
                boxShadow: 'none',
              }}
              component={RouterLink}
              to="/home"
              variant="contained"
              startIcon={
                <CancelIcon />
              }
            >
              Cancel
                  </Button>
            <Button variant="contained"
              size="small" style={{
                font: '#0069d9',
                boxShadow: 'none',
              }} color="primary" startIcon={
                <SaveIcon />
              }
              disabled={this.state.rowData.length > 0 ? false : true}
              onClick={() => { this.saveData(); this.handleClickOpen(); }}
            >Save </Button>
            <Button variant="contained"
              size="small" style={{
                font: '#0069d9',
                boxShadow: 'none',
              }} color="secondary" startIcon={
                <DoneAllIcon />
              }
              disabled={this.state.rowData.length > 0 ? false : true}
              onClick={() => { this.submitData(); this.handleClickOpen(); }}
            >Submit</Button>
          </Paper>
        </center>
      </Container>
      <Dialog
        open={this.state.open}


        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={(e) => this.handleClose(e)} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }



  handleRowChange(row, data) {
    const rowDataCopy = this.state.rowData.slice(0);
    rowDataCopy[row] = data;
    this.setState({
      rowData: rowDataCopy

    });
  }
  handleRowDelete(row) {
    const rowDataCopy = this.state.rowData.slice(0);
    rowDataCopy.splice(row, 1);
    this.setState({
      rowData: rowDataCopy
    });
  }
  handleRowAdd() {
    let id = this.state.id;
    id = id++;
    const rowDataCopy = this.state.rowData.slice(0);
    rowDataCopy.push({ categorie: this.state.categorie, Quantite: this.state.Quantite, product: this.state.product, orderDate: this.state.orderDate, volume: this.state.volume, comment: this.state.comment });
    this.setState({
      rowData: rowDataCopy,
      id: id
    });
    console.log(this.state.orderDate)
  }

}
export default OrderProduct;