import MaterialTable from "material-table";
import { useEffect } from "react";
import React from 'react';
import { forwardRef } from 'react';
import { saveAs } from 'file-saver';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import pdf from '@material-ui/icons/PictureAsPdf';
import Refresh from '@material-ui/icons/Autorenew';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import authHeader from 'services/auth-header';
import {  Select, Paper } from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import "../TableOrder/TableOrder.css";
import axios from 'axios';

export default function LensesOrders() {
    const { useState } = React;
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
        pdf: forwardRef((props, ref) => <pdf {...props} ref={ref} />)
    };
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [open3, setOpen3] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
   
    const [dialogsph, setdialogsph] = useState('');
    const [dialogComment, setdialogComment] = useState('');
    const [dialogOrderDate, setdialogOrderDate] = useState(new Date());
    const [dialogQuantite, setdialogQuantite] = useState(0);

    
 


    useEffect(() => {
        async function fetchData() {
            const userId = JSON.parse(localStorage.getItem('user'));
            const result = await axios('https://mocbackend.cleverapps.io/ordersLentille/list/' + userId.id);
            return result;
        }
        fetchData().then(result => setData(result.data.data));


    }, []);
    const createAndDownloadPdf = (orderno) => {

        axios.post('https://mocbackend.cleverapps.io/create-pdfLentille', { id: orderno })
            .then(() => axios.get('https://mocbackend.cleverapps.io/fetch-pdfLentille', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'OrderLenses0000' + orderno + '.pdf');
            })
    }

    const sendUpdate = (Orderdate, Category, Products, Status, Comment, qte, pss, orderid, OrderType) => {

        const baseUrl = "https://mocbackend.cleverapps.io/orders" + OrderType + "/update/" + orderid


        const datapost = {
            Orderdate: Orderdate,
            Category: Category,
            Products: Products,
            Status: Status,
            Comment: Comment,
            qte: qte,
            pss: pss,

        }

        axios.post(baseUrl, datapost, { headers: authHeader() })
            .then(response => {
                if (response.data.success) {
                    setMessage("order updated successfully")

                }
                else {

                    setMessage("Error when updating data")

                }
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })




    }
    const sendDelete = (userId, OrderType) => {

        const baseUrl = `https://mocbackend.cleverapps.io/orders` + OrderType + `/delete/` + userId

        axios.get(baseUrl, { headers: authHeader() })
            .then(response => {
                if (response.data.success) {
                    setMessage("order deleted successfully")
                    //alert(response.data.message)
                }
            })
            .catch(error => {
                setMessage("Error when delete order")
            })
    }
    const updateStatus = (orderid, status, OrderType) => {

        // url de backend
        const baseUrl = "https://mocbackend.cleverapps.io/orders" + OrderType + "/updateStatus/" + orderid
        // parameter data post
        const datapost = {
            Status: "WaitingValidation",

        }

        if (status == "Draft") {

            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then(response => {
                    if (response.data.success) {
                        setMessage("Order updated from status Draft to Waiting Validation")
                        //alert(response.data.message)
                        window.location.reload(false)
                    }
                    else {

                        setMessage("Error when updating status ")


                    }
                })
                .catch(error => {
                    setMessage(error)
                    console.log(error)
                })
        }
        else {
            setMessage("only orders with status 'Draft' can be changed")
        }
    }
    const hundleUpdateStatus = () => {

        updateStatus(localStorage.getItem(("orderID")), localStorage.getItem(("status")), localStorage.getItem(("OrderType")));
        setOpen3(false)
        handleClickOpen()
    }
    const handleClickOpenUpdateStatus = (orderid, status, OrderType) => {
        setOpen3(true)
        localStorage.setItem("orderID", orderid);
        localStorage.setItem("status", status);
        localStorage.setItem("OrderType", OrderType);

    };
    const handleClickOpen = () => {
        setOpen(true)

    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleClose2 = () => {
        setOpen2(false)
    };
    const handleClose3 = () => {
        setOpen3(false)
    };
    return (
        <React.Fragment>
            <MaterialTable
                title="Lenses Orders"
                icons={tableIcons}
                columns={[
                    {
                        title: 'Order no', field: 'Orderno', editable: 'never', cellStyle: {
                            backgroundColor: '#B1D9FE',
                            color: '#FFF'
                        },
                        headerStyle: {
                            backgroundColor: '#B1D9FE',
                        }
                    },
                    { title: 'Order date', field: 'Orderdate', type: "date" },
                    { title: 'Category', field: 'Category', lookup: { Lenses: 'Lenses' } },
                    {
                        title: 'Products',
                        field: 'Products',
                        lookup: { SkySoft: 'SkySoft' }
                    },
                    {
                        title: 'Status',
                        field: 'Status',
                        editable: 'never',
                        lookup: { WaitingValidation: "Waiting Validation", Draft: "Draft", Validated: "Validated", InProgress: "In Progress", Suspended: "Suspended", Created: "Created", Rejected: "Rejected", Paid: "Paid", PartiallyPaid: "Partially Paid", Closed: "Closed" }, cellStyle: {

                            
                        }
                    },
                    {
                        title: 'Comment',
                        field: 'Comment',

                    },
                    { title: 'Quantity', field: 'qte', type: 'numeric' },


                    {
                        title: 'Sph', field: 'pss', lookup: {
                            '-1,00': '-1,00', '-1,25': '-1,25', '-1,50': '-1,50', '-1,75': '-1,75', '-2,00': '-2,00', '-2,25': '-2,25', '-2,50': '-2,50', '-2,75': '-2,75', '-3,00': '-3,00', '-3,25': '-3,25', '-3,50': '-3,50', '-3,75': '-3,75', '-4,00': '-4,00', '-4,25': '-4,25', '-4,50': '-4,50', '-4,75': '-4,75', '-5,00': '-5,00', '-5,25': '-5,25', '-5,50': '-5,50', '-5,75': '-5,75', '-6,00': '-6,00', '-6,50': '-6,50', '-7,00': '-7,00', '-7,50': '-7,50', '-8,00': '-8,00', '-8,50': '-8,50', '-9,00': '-9,00', '-9,50': '-9,50', '-10,00': '-10,00', '-10,50': '-10,50', '-11,00': '-11,00', '-11,50': '-11,50', '-12,00': '-12,00', '-12,50': '-12,50', '-13,00': '-13,00', '-13,50': '-13,50', '-14,00': '-14,00', '-14,50': '-14,50', '-15,00': '-15,00', '-15,50': '-15,50', '-16,00': '-16,00'
                        }
                    },
                ]}

                data={data}
                actions={[
                    {
                        icon: Refresh,
                        tooltip: 'Refresh',
                        isFreeAction: true,
                        onClick: () => window.location.reload(false)
                    },
                    {
                        icon: pdf,
                        tooltip: 'Download Orders PDF',
                        onClick: (event, rowData) => createAndDownloadPdf(rowData.Orderno)

                    }
                    ,
                    {
                        icon: Check,
                        tooltip: 'submit',
                        onClick: (event, rowData) => { { handleClickOpenUpdateStatus(rowData.Orderno, rowData.Status, "Lentille") } }

                    }
                ]}

                editable={{

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                console.log(newData)
                                setData([...dataUpdate]);
                                console.log(newData.Status)
                                if (oldData.Status == "WaitingValidation" || oldData.Status == "Draft") {

                                    sendUpdate(newData.Orderdate, newData.Category, newData.Products, newData.Status, newData.Comment, newData.qte, newData.pss, newData.Orderno, "Lentille");

                                }
                                else {
                                    setMessage("only Order With status Draft or waiting validation can be changed")
                                    handleClickOpen();
                                }
                                resolve();
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                              if(oldData.Status!="InProgress" && oldData.Status!="PartiallyPaid" &&oldData.Status!="Suspended"  ){
                               
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                 sendDelete(oldData.Orderno, "Lentille");
                                  handleClickOpen();
                                }
                                else{
                                  setMessage("Only orders with status Draft,Waiting Validation,Paid,Rejected or closed can be deleted")
                                  handleClickOpen();
                                }
                              
                               
                                resolve()
                            }, 1000)

                        }),


                }}
                onRowClick={((evt, selectedRow) => {
                    
                    setdialogOrderDate( selectedRow.Orderdate )
                    setdialogQuantite( selectedRow.qte  )
                    setdialogsph( selectedRow.pss  )
                    setdialogComment( selectedRow.Comment )
        
                    setOpen2(true )
                }
                )}      

                options={{

                    headerStyle: {
                      backgroundColor: '#82BFE8',
                      color: '#FFF'
                    },
                    exportButton: true,
                    filtering: true,
                    grouping: true,
                    sorting: true,
                    // selection:true,
                    actionsColumnIndex: -1,
                    rowStyle: rowData => {
                      return {backgroundColor:rowData.Status=="WaitingValidation"?"#ffff00":rowData.Status=="Validated"?"greenyellow":rowData.Status=="Rejected"?"#EB3B0C":rowData.Status=="Closed"?"#8F8F8F":rowData.Status=="InProgress"?"#FAA742":rowData.Status=="Suspended"?"#DAFA87":rowData.Status=="Paid"?"#0BDB16":rowData.Status=="PartiallyPaid"?"#81D4BF":"#E7E6E9"};
                    }
                }}
            />
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

        <Dialog
          open={open3}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Alert
        </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to submit this Order ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={(e) => hundleUpdateStatus()} color="primary">
              ok
          </Button>
            <Button onClick={(e) => handleClose3(e)} color="primary">
              cancel
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth={150}
          open={open2}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">

          </DialogTitle>
          <DialogContent>

            <div className="animated fadeIn">



              <div className="table">
                <div className="table-title">Lenses Orders</div>
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


                  <div className="table-row"     >



                    <div className="table-data">
                      <Select name="category" id="category"
                        defaultValue={'Lenses'}
                        disabled
                      >
                        <MenuItem value={'Lenses'}>Lenses</MenuItem>
                      </Select>
                    </div>
                    <div className="table-data">
                      <Select
                        labelId="product"
                        id="product"
                        defaultValue={'SkySoft'}
                        disabled
                      >
                        <MenuItem value={'SkySoft'}>SkySoft</MenuItem>

                      </Select>

                    </div>
                    <div className="table-data">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker

                          id="orderDate"
                          format="yyyy-MM-dd"
                          //  format="MM/dd/yyyy"
                          // 
                          value={new Date(dialogOrderDate)}
                          disabled
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
                        disabled
                        defaultValue={1}
                        value={dialogQuantite}



                      />
                    </div>
                    <div className="table-data">
                      <Select
                        name="sph"
                        disabled
                        value={ dialogsph}
                      //  onChange={this.handleSphChange}
                        defaultValue=""

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
                        disabled
                        type="text"
                        value={dialogComment}


                      />
                    </div>

                  </div>
                  <tfoot>
                    <tr>

                    </tr>
                  </tfoot>

                </div>
              </div>
            </div>

          </DialogContent>
          <DialogActions>

            <Button onClick={(e) =>handleClose2(e)} color="primary">
              ok
          </Button>
          </DialogActions>
        </Dialog>
        </React.Fragment>
    )
}