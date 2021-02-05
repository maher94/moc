import React, { useState } from "react";
import "./TableOrder.css";
import { Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
const _defaultCosts = [

  {
    name: "lentille",
    price: 40
  }
];

const OrderLenses = () => {
  const [costs, setCosts] = useState(_defaultCosts);

  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);

  };

  const addNewCost = () => {
    setCosts(prevCosts => [...prevCosts, { name: "", price: 0 }]);
  };

  const getTotalCosts = () => {
    console.log(costs);
    return costs.reduce((total, item) => {
      return total + Number(item.price);

    }, 0);
  };
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);

  };
  const [products, setProducts] = React.useState('');
  const handleChangeProducts = (event) => {
    setProducts(event.target.value);

  };
  const [sph, setSph] = React.useState('');
  const handleChangeSph = (event) => {
    setSph(event.target.value);
    console.log(event.target.value)

  };
  return (
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
        <div className="table-body">
          {costs.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  onChange={handleChange}
                >

                  <MenuItem value={'Lenses'}>Lenses</MenuItem>

                </Select>
              </div>
              <div className="table-data">

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  onChange={handleChangeProducts}
                >
                  <MenuItem value={'Skysoft'}>Skysoft</MenuItem>

                </Select>

              </div>
              <div className="table-data">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker

                    id="date-picker-dialog"
                    format="MM/dd/yyyy"
                    //value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  /></MuiPickersUtilsProvider>
              </div>
              <div className="table-data">
                <TextField
                  id="outlined-number"
                  name="name"
                  type="number"
                  variant="outlined"
                //onChange={handleCostsChange}
                />
              </div>
              <div className="table-data">
                <Select
                  name="sph"
                  data-id={index}

                  onChange={handleChangeSph}

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

                // onChange={handleCostsChange}
                />
              </div>
            </div>
          ))}
          <div className="table-row">
            <div className="table-data">
              <Button style={{ backgroundColor: '#04E605', position: 'absolute', color: 'white', fontSize: '30 px' }} onClick={addNewCost}>  + Add   </Button>

            </div>
          </div>

        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-data">

            </div>
            <div className="table-data">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLenses;
