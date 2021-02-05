import React, { Fragment } from 'react';
import MaterialTable from "material-table";
import { Button, Paper, TextField, Select } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddShoppingCart';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { forwardRef } from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import { saveAs } from 'file-saver';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import OrderAPI from '../api/OrderAPI';
import MenuItem from '@material-ui/core/MenuItem';

export default function OrderLenses2() {
    
    const getStockLenses = _ => {
             
        fetch('http://localhost:4000/stock/getAQOfLenses')
          .then(response => response.json())
          .then(response => setAQOfLenses(response.availablequantity[0].availablequantity ))
          .catch(err => console.error(err))
      }

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    }
    const { useState } = React;
    const [commentError, setCommentError] = useState({
        error: false,
        label: '',
        helperText: '',
    });
    const [quantityError, setQuantityError] = useState({
        error: false,
        label: '',
        helperText: '',
    });
    const [sphError, setSphError] = useState({
        error: false,
        label: '',
        helperText: '',
    });
    const [categoryError, setCategoryError] = useState({
        error: false,
        label: '',
        helperText: '',
    });
    const [productError, setProductError] = useState({
        error: false,
        label: '',
        helperText: '',
    });
    const [orderDateError, setOrderDateError] = useState({
        error: false,
        label: '',
        helperText: '',
    });

    const [data, setData] = useState([]);
    const [qte, setQte] = useState(0);
    const [AQOfLenses, setAQOfLenses] = useState(0);
    
    const saveData = () => {
        const userId = JSON.parse(localStorage.getItem('user'));
       
        data.forEach(element => {
        
            setQte(qte+ parseInt(element.Quantite))
           
        });
      
         
        
        data.forEach(order => {
            console.log(order)
           console.log(order.qte)
            if (order.qte > 0 ) {
                if(AQOfLenses>=qte){
                
                OrderAPI.sendCreate(order.Orderdate, order.Category, order.Products, "Draft", order.Comment, order.qte, order.pss, "Lentille", userId.id,parseInt(order.qte*150),0,0,parseInt(order.qte*150))
                //this.setState({ message: "information Submited successfully with status Draft  "})
                
            }   
                   
            else{
                 
              
               // this.setState({ message: "failed : Available Quantity is "+this.state.AQOfLenses })
            }    
                    
                 
            }
            else {
               // this.setState({ message: "Please verify your data, you must added a quantity greater than 0" })
                // alert("Please verify your data, you must added a quantity greater than 0")

            }
        });

    }
    return (
        <React.Fragment>
            <MaterialTable
                title="Create new Lenses Orders"
                icons={tableIcons}
                columns={[
                    { title: 'Category', field: 'Category', lookup: { Lenses: 'Lenses' } , editComponent: (props) => (
                        <Select
                            type="text"
                            error={categoryError.error}
                            helperText={categoryError.helperText}
                            value={props.value ? props.value : ''}
                            onChange={e => props.onChange(e.target.value)}
                         >
                              <MenuItem value={'Lenses'}>Lenses</MenuItem>
                              </Select>
                    )},
                    {
                        title: 'Products',
                        field: 'Products', editComponent: (props) => (
                            <Select
                                type="text"
                                error={productError.error}
                                helperText={productError.helperText}
                                value={props.value ? props.value : ''}
                                onChange={e => props.onChange(e.target.value)}
                             >
                            <MenuItem value={'SkySoft'}>SkySoft</MenuItem>
                            </Select>
                        ),
                        lookup: { SkySoft: 'SkySoft' },
                        
                      },
                    { title: 'Order date', field: 'Orderdate', type: 'date', editComponent: (props) => (
                        <TextField
                            type="date"
                            error={orderDateError.error}
                            helperText={orderDateError.helperText}
                            value={props.value ? props.value : ''}
                            onChange={e => props.onChange(e.target.value)}
                        />
                    ) },
                    { title: 'Quantity', field: 'qte', type: 'numeric', editComponent: (props) => (
                        <TextField
                            type="number"
                            defaultValue='0'
                            error={quantityError.error !=null?quantityError.error:""}
                            helperText={quantityError!=null?quantityError.helperText:''}
                            value={props.value ? props.value : ''}
                            onChange={e => props.onChange(e.target.value)}
                        />
                    )},
                    {
                        title: 'Sph', field: 'pss' 
                        , editComponent: (props) => (
                            <Select
                                type="text"
                                error={sphError.error}
                                helperText={sphError.helperText}
                                value={props.value ? props.value : ''}
                                onChange={e => props.onChange(e.target.value)}
                              
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
                        ),
                         
                    },
                   
                    { title: 'Comment', field: 'Comment',  editComponent: (props) => (
                        <TextField
                            type="text"
                            error={commentError.error}
                            helperText={commentError.helperText}
                            value={props.value ? props.value : ''}
                            onChange={e => props.onChange(e.target.value)}
                        />
                    )},
                ]}
                data={data}

                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            
                            
                             if (newData.qte === '0' || newData.qte==undefined ){
                                setQuantityError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'Required Quantity'
                                });
                                reject();
                                return;
                            }
                             if (newData.Category === '' || newData.Category==undefined ){
                                setCategoryError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'Required category '
                                });
                                reject();
                                return;
                            }
                              if (newData.Products === '' || newData.Products==undefined ){
                                setProductError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'please select the order product '
                                });
                                reject();
                                return;
                            }
                              if (newData.pss === '' || newData.pss==undefined ){
                                setSphError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'please select the Sph of Lenses '
                                });
                                reject();
                                return;
                            }
                              if (newData.Orderdate === '' || newData.Orderdate==undefined ){
                                setOrderDateError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'Required order Date '
                                });
                                reject();
                                return;
                            }
                            if (newData.Comment === '' || newData.Comment==undefined ) {
                                setCommentError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'Required Comment'
                                });
                                reject();
                                return;
                            }
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                         
                    }),
                    
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                           /* if (newData.Comment === '') {
                                setCommentError({
                                    error: true,
                                    label: 'required',
                                    helperText: 'Required Comment'
                                });
                                reject();
                                return;
                            }*/
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve()
                            }, 1000)
                        })

                }}
                cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                      return new Promise((resolve, reject) => {
                        console.log('newValue: ' + newValue);
                        setTimeout(resolve, 1000);
                      });
                    }}}
                /*  components={{
                    Action: props => (
                        <Fragment><Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                      >
                        Edit
                      </Button>
                      </Fragment>
                      
                      
                    ),
                    
                  }
              
              }*/
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                    paging: false,
                    sorting: false
                }}
            />


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
                            disabled={data.length > 0 ? false : true}
                            onClick={() => {saveData() }}
                        >Save </Button>
                        <Button variant="contained"
                            size="small" style={{
                                font: '#0069d9',
                                boxShadow: 'none',
                            }} color="secondary" startIcon={
                                <DoneAllIcon />
                            }
                            disabled={data.length > 0 ? false : true}
                            onClick={() => { }}
                        >Submit </Button>
                    </Paper>
                </center>
            </Container>
        </React.Fragment>
    )
}