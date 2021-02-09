import axios from 'axios';
import authHeader from 'services/auth-header';
 

export const sendDelete = (userId, OrderType) => {

  const baseUrl = `https://mocbackend.cleverapps.io/orders` + OrderType + `/delete/` + userId

  axios.get(baseUrl, { headers: authHeader() })
    .then(response => {
      if (response.data.success) {
        alert(response.data.message)
      }
    })
    .catch(error => {
      alert("Error on delete item")
    })
}
export const sendCreate = (orderdate, Category, Products, Status, Comment, qte, pss, OrderType, userId,price,paidAmount,partiallyPaidAmount,amountStillToPay) => {

  // url de backend
  const baseUrl = "https://mocbackend.cleverapps.io/orders" + OrderType + "/create"
  // parameter data post
  if (OrderType == "Produit") {
    const datapost = {
      Orderdate: orderdate,
      Category: Category,
      Products: Products,
      Status: Status,
      Comment: Comment,
      qte: qte,
      volume: pss,
      userId: userId,
      price:price,
      paidAmount:paidAmount,
      partiallyPaidAmount:partiallyPaidAmount,
      amountStillToPay:amountStillToPay


    }
    axios.post(baseUrl, datapost, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
        //alert('success')
        }
        else {
        alert("Error when creating a new order ")

        }
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
  }
  else {

    const datapost = {
      Orderdate: orderdate,
      Category: Category,
      Products: Products,
      Status: Status,
      Comment: Comment,
      qte: qte,
      pss: pss,
      userId: userId,
      price:price,
      paidAmount:paidAmount,
      partiallyPaidAmount:partiallyPaidAmount,
      amountStillToPay:amountStillToPay

    }
    axios.post(baseUrl, datapost, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
         // alert(response.data.message)
        }
        else {
          alert("Error when creating a new order ")

        }
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })

  }



}
export const updateStatus = (orderid, status,OrderType) => {



  // url de backend
  const baseUrl = "https://mocbackend.cleverapps.io/orders" + OrderType + "/updateStatus/" + orderid
  // parameter data post
  const datapost = {
    Status: "WaitingValidation",

  }
 
if (status=="Draft"||status=="Created"){
 
  axios.post(baseUrl, datapost, { headers: authHeader() })
    .then(response => {
      if (response.data.success) {
        
        //alert(response.data.message)
        window.location.reload(false)
      }
      else {
       
        alert("Error when updating status ")
        

      }
    })
    .catch(error => {
      alert(error)
      console.log(error)
    })
  }
  else 
  {
    alert("you can submit only the Draft Orders")
  }
}

export const sendUpdate = (Orderdate, Category, Products, Status, Comment, qte, pss, orderid, OrderType) => {


  // url de backend
  const baseUrl = "https://mocbackend.cleverapps.io/orders" + OrderType + "/update/" + orderid
  // parameter data post
  if (OrderType == "Produit") {
    const datapost = {
      Orderdate: Orderdate,
      Category: Category,
      Products: Products,
      Status: Status,
      Comment: Comment,
      qte: qte,
      volume: pss,

    }

    axios.post(baseUrl, datapost, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          //alert(response.data.message)
        }
        else {
          alert("Error when updating data")

        }
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
  }
  else {
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
         // alert(response.data.message)
        }
        else {
          alert("Error when updating data")

        }
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })


  }

}

export const getCountNborders = () => {



  axios.get('https://mocbackend.cleverapps.io/orders/countall', { headers: authHeader() })
    .then(function (response) {
      // handle success
      if (response.data.success) {
      return response.data.count;
      }

    })
    .catch(function (error) {

      console.log(error);
    })


}


export const getCountProductOrdersByStatus = (userId,status) => {



  axios.get('https://mocbackend.cleverapps.io/ordersProduit/countProductOrdersByStatus/'+ userId+'/'+status, { headers: authHeader() })
    .then(function (response) {
      // handle success

      return response.data.count;


    })
    .catch(function (error) {

      console.log(error);
    })


}

export const countLensesOrdersByStatus = (userId,status) => {



  axios.get('https://mocbackend.cleverapps.io/ordersLentille/countLensesOrdersByStatus/' + userId+'/'+status, { headers: authHeader() })
    .then(function (response) {
      // handle success
      if (response.data.success) {
      return "response";
      }
      else return "test"

    })
    .catch(function (error) {

      console.log(error);
    })


}
export default { sendDelete, sendCreate,countLensesOrdersByStatus }
