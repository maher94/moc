import React, { Component } from 'react';
import { Button, Table, Select,Paper} from "@material-ui/core";
import "./TableOrder.css";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import * as OrderAPI from "../api/OrderAPI"

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            Produits: [],
            Quantite: "",
            id: 0,
            orderDate: '',
            sph:"",
            comment:"",
            product:"",
            categorie:""
        };

        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleRowAdd = this.handleRowAdd.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.pushToCaller = this.pushToCaller.bind(this);
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
       let date= new Date(e.getFullYear(),  e.getMonth()+1, e.getDate())
       this.setState({
            orderDate: date
        }, this.pushToCaller);
        
        console.log(date)
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
            product:this.state.product,
            orderDate:this.state.orderDate,
            sph : this.state.sph,
            comment : this.state.comment,
            
        });
    }
    saveData= () => {
        const userId = JSON.parse(localStorage.getItem('user'));
        
        this.state.rowData.forEach(order => {
            OrderAPI.sendCreate(order.orderDate,order.categorie,order.product,"Draft",order.comment,order.Quantite,order.sph,"Lentille",userId.id)

        });
        
    }

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

                                    onChange={this.handleCategorieChange} >

                                    <MenuItem value={'Lenses'}>Lenses</MenuItem>

                                </Select>
                            </div>
                            <div className="table-data">

                                <Select
                                    labelId="product"
                                    id="product"

                                    onChange={this.handleProductChange}
                                >
                                    <MenuItem value={'Skysoft'}>Skysoft</MenuItem>

                                </Select>

                            </div>
                            <div className="table-data">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker

                                        id="orderDate"
                                        format="yyyy-MM-dd"
                                        value={this.state.orderDate!=""?this.state.orderDate:new Date()}
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
                                    value={this.state.rowData.Quantite}
                                    onChange={this.handleQuantiteChange}
                                />
                            </div>
                            <div className="table-data">
                                <Select
                                    name="sph"
                                    data-id={index}
                                
                                  //  value={this.state.rowData.sph}
                                    onChange={this.handleSphChange} 

                                >
                                    <MenuItem value="-1,00">-1,00</MenuItem>
                                    <MenuItem value="-1,25">-1,25</MenuItem>
                                    <MenuItem value="-1,25">-1,25</MenuItem>
                                    <MenuItem value="-1,5">-1,50</MenuItem>
                                    <MenuItem value="-1,75">-1,75</MenuItem>
                                    <MenuItem value="-2,00">-2,00</MenuItem>
                                    <MenuItem value="-2,25">-2,25</MenuItem>
                                    <MenuItem value="-2,50">-2,50</MenuItem>
                                    <MenuItem value="-2,75">-2,75</MenuItem>
                                    <MenuItem value="-3,00">-3,00</MenuItem>
                                    <MenuItem value="-3,25">-3,25</MenuItem>
                                    <MenuItem value="--3,50">-3,50</MenuItem>
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
                                   // value={this.state.rowData.Prix} onChange={this.handlePrixChange} 
                                // onChange={handleCostsChange}
                                />
                            </div>
                           

                           
                           </div>)}

                    <div className="table-row" >
                 

                        <div className="table-data"><Button onClick={this.handleRowAdd} >Ajouter une ligne</Button> <Button onClick={this.handleRowDelete} active  >Effacer</Button></div>
                    </div>
                </div>

                <tfoot>
                    <tr>

                    </tr>
                </tfoot>

            </div>

            <Container maxWidth="xs" >
                        <center>
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
                               onClick={this.saveData}
                              >Save </Button>
                              <Button variant="contained"
                                 size="small" style={{
                                    font: '#0069d9',
                                    boxShadow: 'none',
                                 }} color="secondary" startIcon={
                                    <DoneAllIcon />
                                 }
                                
                              >Submit </Button>
                           </Paper>
                        </center>
                     </Container>

        </div>);
    }
    getTotal() {
        let grandTotal = 0;
        const rowTotals = this.state.rowData.map(row => this.state.Quantite * this.state.Prix);
        if (rowTotals.length > 0) {
            grandTotal = rowTotals.reduce((acc, val) => acc + val);
        }
        return grandTotal;
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
        rowDataCopy.push({ categorie: this.state.categorie, Quantite: this.state.Quantite,product: this.state.product,orderDate:this.state.orderDate,sph:this.state.sph,comment:this.state.comment });
        this.setState({
            rowData: rowDataCopy,
            id: id
        });
        console.log(this.state.rowData)
    }

}
export default Test;