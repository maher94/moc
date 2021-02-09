import React, { Fragment, useEffect } from 'react';
import MaterialTable from "material-table";
import { Button, Paper, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
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
import Axios from 'axios';

export default function OrderProduct2() {

  
    useEffect(() => {
        async function fetchData() {
             
            const result = await Axios('https://mocbackend.cleverapps.io/stock/getAQOfProduct');
            return result;
        }
        fetchData().then(result => setAQOfProduct(result.data.availablequantity[0].availablequantity));
        

    }, []);
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    }
    const { useState } = React;

    const [data, setData] = useState([]);
    const [qte, setQte] = useState(0);
    const [AQOfProduct, setAQOfProduct] = useState(0);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const countQte=()=>{
        data.forEach(element => {

            setQte(qte + parseInt(element.qte))

        });
    }
    const saveData = () => {
        const userId = JSON.parse(localStorage.getItem('user'));
         
       
        
        console.log(qte)
        data.forEach(order => {
             
            
           
            if (order.qte > 0) {
                if (AQOfProduct >= qte) {

                    OrderAPI.sendCreate(order.Orderdate, order.Category, order.Products, "Draft", order.Comment, order.qte, order.volume, "Produit", userId.id,  order.volume === "25 ML"?parseInt( order.qte * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40), 0, 0,  order.volume === "25 ML"?parseInt( order.qte * 10):order.volume === "50 ML"?parseInt( order.qte * 20):order.volume === "75 ML"?parseInt( order.qte * 30):parseInt( order.qte * 40))
                    setMessage("information Submited successfully with status Draft  ")

                }

                else {


                    setMessage("failed : Available Quantity is " + AQOfProduct)
                }


            }
            else {
                setMessage("Please verify your data, you must added a quantity greater than 0")
                // alert("Please verify your data, you must added a quantity greater than 0")

            }
        });
    }
        const submitData = () =>{
            const userId = JSON.parse(localStorage.getItem('user'));
             
            data.forEach(order => {
                if (order.qte > 0) {
                    if (AQOfProduct >= qte) {
                        OrderAPI.sendCreate(order.Orderdate, order.Category, order.Products, "WaitingValidation", order.Comment, order.qte, order.volume, "Produit", userId.id,  order.volume === "25 ML"?parseInt( order.qte * 10):order.volume === "50 ML"?parseInt( order.Quantite * 20):order.volume === "75 ML"?parseInt( order.Quantite * 30):parseInt( order.Quantite * 40), 0, 0,  order.volume === "25 ML"?parseInt( order.qte * 10):order.volume === "50 ML"?parseInt( order.qte * 20):order.volume === "75 ML"?parseInt( order.qte * 30):parseInt( order.qte * 40))
                         setMessage("information Submited successfully with status Waiting Validation")

                    }

                    else {


                        setMessage("failed : Available Quantity is " + AQOfProduct)
                    }

                }
                else {
                    setMessage("Please verify your data, you must added a quantity greater than 0")
                }

            });

        }
    
    const handleClickOpen = () => {
        setOpen(true)

    };
    const handleClose = () => {
        setOpen(false)

    };
    return (
        <React.Fragment>
            <MaterialTable
                title="Create new Product Orders"
                icons={tableIcons}
                columns={[
                    { title: 'Category', field: 'Category', lookup: { Product: 'Product' }, validate: rowData => rowData.Category != undefined && rowData.Category != '' },
                    {
                        title: 'Products',
                        field: 'Products',
                        lookup: { Releasy: 'Releasy' }, validate: rowData => rowData.Products != undefined && rowData.Products != ''
                    },
                    { title: 'Order date', field: 'Orderdate', type: 'date', validate: rowData => rowData.Orderdate != undefined && rowData.Orderdate != '' },
                    { title: 'Quantity', field: 'qte', type: 'numeric', validate: rowData => parseInt(rowData.qte) >= 0 && rowData.qte != '' && rowData.qte != undefined },
                    {
                        title: 'volume', field: 'volume', lookup: {
                          '25 ML': '25 ML', '50 ML': '50 ML', '75 ML': '75 ML', '100 ML': '100 ML'
                        },validate: rowData => parseInt(rowData.volume) >= 0 && rowData.volume != '' && rowData.volume != undefined }
                    ,

                    { title: 'Comment', field: 'Comment', validate: rowData => rowData.Comment !== '' && rowData.Comment != undefined && rowData.Comment.length < 30 },
                ]}
                data={data}

                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                               
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
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
                    <label style={{ color: 'red' }}>The comment length should be between 1 and 30 characters</label>

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
                            }}  startIcon={
                                <SaveIcon />
                            }
                            disabled={data.length > 0 ? false : true}
                            onClick={() => {  saveData(); handleClickOpen(); }}
                        >Save </Button>
                        <Button variant="contained"
                            size="small" style={{
                                font: '#0069d9',
                                boxShadow: 'none',
                            }}   startIcon={
                                <DoneAllIcon />
                            }
                            disabled={data.length > 0 ? false : true}
                            onClick={() => {  submitData();handleClickOpen();}}
                        >Submit </Button>
                    </Paper>
                </center>
            </Container>
            <Dialog
                open={open}


                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Alert
        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={(e) => handleClose(e)} color="primary">
                        ok
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}