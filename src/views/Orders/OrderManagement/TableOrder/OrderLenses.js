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
import DeleteSweep from '@material-ui/icons/DeleteSweep';
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
class OrderLenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            Quantite:1,
            id: 0,
            orderDate: new Date(),
            sph: "",
            comment: "",
            product: "SkySoft",
            categorie: "Lenses",
            open: false,
            message: "",
            AQOfLenses :0,
            totalQuantity : 0
            
        };

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleRowAdd = this.handleRowAdd.bind(this);
        this.pushToCaller = this.pushToCaller.bind(this);
    }
   
        componentDidMount() {
            this.getStockLenses();
            
          }
        
          getStockLenses = _ => {
             
            fetch('http://localhost:4000/stock/getAQOfLenses')
              .then(response => response.json())
              .then(response => this.setState({ AQOfLenses: response.availablequantity[0].availablequantity }))
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
    handleSphChange = (e) => {
        this.setState({
            sph: e.target.value
        }, this.pushToCaller);
        console.log(e.target.value)
    }
    handleCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        }, this.pushToCaller);

    }
    handleselectDateChange = (e) => {
        // let date= parseInt(e.getFullYear() + "-"+ e.getMonth()+1) +"-"+ e.getDate();

        // let today=new Date();
        //     let date = new Date(e!=null?e.getFullYear():today.getFullYear(),e!=null? e.getMonth() :today.getMonth()+1, e!=null?e.getDay():today.getDate())
        // let date= parseInt( e.getMonth()+1)+ "/"+parseInt(e.getDate() ) +"/"+e.getFullYear() ; 
        this.setState({
            orderDate: new Date()
        }, this.pushToCaller);

    }
    

    pushToCaller = () => {
        this.handleRowChange(this.state.id, {
            Quantite: parseInt(this.state.Quantite ),
            categorie: this.state.categorie,
            product: this.state.product,
            orderDate: this.state.orderDate,
            sph: this.state.sph,
            comment: this.state.comment,

        });
    }
    saveData = () => {
        const userId = JSON.parse(localStorage.getItem('user'));
       this.qte=0
        this.state.rowData.forEach(element => {
         //   this.setState({
            //    totalQuantity:element!=undefined? parseInt( this.state.totalQuantity)+parseInt(element.Quantite):0
          //  });
          this.qte=this.qte+ parseInt(element.Quantite)
            console.log(element.Quantite)
        });
      
        console.log(this.qte)
        console.log(this.state.rowData)
        this.state.rowData.forEach(order => {
             
           
            if (order.Quantite > 0 ) {
                if(this.state.AQOfLenses>=this.qte){
                
                OrderAPI.sendCreate(order.orderDate, order.categorie, order.product, "Draft", order.comment, order.Quantite, order.sph, "Lentille", userId.id,parseInt(order.Quantite*150),0,0,parseInt(order.Quantite*150))
                this.setState({ message: "information Submited successfully with status Draft  "})
                
            }   
                   
            else{
                 
                console.log(document.getElementById("quantity").value)
                this.setState({ message: "failed : Available Quantity is "+this.state.AQOfLenses })
            }    
                    
                 
            }
            else {
                this.setState({ message: "Please verify your data, you must added a quantity greater than 0" })
                // alert("Please verify your data, you must added a quantity greater than 0")

            }
        });

    }
    submitData = () => {
        const userId = JSON.parse(localStorage.getItem('user'));

        this.state.rowData.forEach(order => {
            if (order.Quantite > 0 ) {
                if(this.state.AQOfLenses>=document.getElementById("quantity").value){
             
                OrderAPI.sendCreate(order.orderDate, order.categorie, order.product, "WaitingValidation", order.comment, order.Quantite, order.sph, "Lentille", userId.id,parseInt(order.Quantite*150),0,0,parseInt(order.Quantite*150))
                this.setState({ message: "information Submited successfully with status Waiting Validation" })
            console.log(document.getElementById("quantity").value)   
            }   
                   
                else{
                     
                    console.log(document.getElementById("quantity").value)
                    this.setState({ message: "failed : Available Quantity is "+this.state.AQOfLenses })
                }
          
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
                <div className="table-title">Create new Lenses Orders</div>
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
                                <div>sph </div>
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
                                    defaultValue={'Lenses'}
                                    onChange={this.handleCategorieChange} >
                                    <MenuItem value={'Lenses'}>Lenses</MenuItem>
                                </Select>
                            </div>
                            <div className="table-data">
                                <Select
                                    labelId="product"
                                    id="product"
                                    defaultValue={'SkySoft'}
                                    onChange={this.handleProductChange}
                                >
                                    <MenuItem value={'SkySoft'}>SkySoft</MenuItem>

                                </Select>

                            </div>
                            <div className="table-data">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker

                                        id="orderDate"
                                        // format="yyyy-MM-dd"
                                        format="MM/dd/yyyy"
                                        // value={this.state.orderDate}
                                        value={new Date()}
                                        onChange={this.handleselectDateChange}
                                        disabled
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
                                    defaultValue={0}
                                   // value={this.state.rowData.Quantite}
                                    onChange={this.handleQuantiteChange}
                                    error={this.state.Quantite < 0 || this.state.Quantite == 0 ? true : false}

                                />
                            </div>
                            <div className="table-data">
                                <Select
                                    name="sph"
                                    data-id={index}
                                    value={this.state.rowData.sph}
                                    onChange={this.handleSphChange}
                                    defaultValue=""
                                    disabled={this.state.Quantite > 0 ? false : true}
                                    error={this.state.sph == "" ? true : false}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="-1,00">-1,00</MenuItem>
                                    <MenuItem value="-1,25">-1,25</MenuItem>
                                    <MenuItem value="-1,25">-1,25</MenuItem>
                                    <MenuItem value="-1,50">-1,50</MenuItem>
                                    <MenuItem value="-1,75">-1,75</MenuItem>
                                    <MenuItem value="-2,00">-2,00</MenuItem>
                                    <MenuItem value="-2,25">-2,25</MenuItem>
                                    <MenuItem value="-2,50">-2,50</MenuItem>
                                    <MenuItem value="-2,75">-2,75</MenuItem>
                                    <MenuItem value="-3,00">-3,00</MenuItem>
                                    <MenuItem value="-3,25">-3,25</MenuItem>
                                    <MenuItem value="-3,50">-3,50</MenuItem>
                                    <MenuItem value="-3,75">-3,75</MenuItem>
                                    <MenuItem value="-4,00">-4,00</MenuItem>
                                    <MenuItem value="-4,25">-4,25</MenuItem>
                                    <MenuItem value="-4,50">-4,50</MenuItem>
                                    <MenuItem value="-4,75">-4,75</MenuItem>
                                    <MenuItem value="-5,00">-5,00</MenuItem>
                                    <MenuItem value="-5,25">-5,25</MenuItem>
                                    <MenuItem value="-5,50">-5,50</MenuItem>
                                    <MenuItem value="-5,75">-5,75</MenuItem>
                                    <MenuItem value="-6,00">-6,00</MenuItem>
                                    <MenuItem value="-6,50">-6,50</MenuItem>
                                    <MenuItem value="-7,00">-7,00</MenuItem>
                                    <MenuItem value="-7,50">-7,50</MenuItem>
                                    <MenuItem value="-8,00">-8,00</MenuItem>
                                    <MenuItem value="-8,50">-8,50</MenuItem>
                                    <MenuItem value="-9,00">-9,00</MenuItem>
                                    <MenuItem value="-9,50">-9,50</MenuItem>
                                    <MenuItem value="-10,00">-10,00</MenuItem>
                                    <MenuItem value="-10,50">-10,50</MenuItem>
                                    <MenuItem value="-11,00">-11,00</MenuItem>
                                    <MenuItem value="-11,50">-11,50</MenuItem>
                                    <MenuItem value="-12,00">-12,00</MenuItem>
                                    <MenuItem value="-12,50">-12,50</MenuItem>
                                    <MenuItem value="-13,00">-13,00</MenuItem>
                                    <MenuItem value="-13,50">-13,50</MenuItem>
                                    <MenuItem value="-14,00">-14,00</MenuItem>
                                    <MenuItem value="-14,50">-14,50</MenuItem>
                                    <MenuItem value="-15,00">-15,00</MenuItem>
                                    <MenuItem value="-15,50">-15,50</MenuItem>
                                    <MenuItem value="-16,00">-16,00</MenuItem>
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
                                    //value={this.state.rowData.comment}
                                    onChange={this.handleCommentChange}
                                    error={this.state.comment.length > 30 ? true : false}
                                
                                // onChange={handleCostsChange}
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
                            onClick={() => {this.saveData(); this.handleClickOpen(); }}
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
                        >Submit </Button>
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
        //console.log(this.state.rowData.length)
     
        const rowDataCopy = this.state.rowData.slice(0);
        rowDataCopy.push({ categorie: this.state.categorie, Quantite:this.state.Quantite, product: this.state.product, orderDate: this.state.orderDate, sph: this.state.sph, comment: this.state.comment });
        this.setState({
            rowData: rowDataCopy,
            id: id
        });
         
         
    }

}
export default OrderLenses;