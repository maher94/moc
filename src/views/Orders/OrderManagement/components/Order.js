import { Component } from "react"

 class Order extends Component{
     
    Order(Orderdate,Category,Products,Comment,qte,pss) {
        this.setState({Orderdate:Orderdate});
      
        
        this.setState({  Category:Category});
            this.setState({Products:Products});
                    this.setState({ Comment:Comment});
                        this.setState({ qte:qte});
                            this.setState({ pss :pss});
           
   } 

}
export default Order;