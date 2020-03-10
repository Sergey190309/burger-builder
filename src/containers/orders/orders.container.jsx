import React from "react";

import Order from "../../components/order/order.component";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/with-error-handler/with-error-handler.component";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    // axios.get("/orders")
    axios.get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        // console.log("orders.container", fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders })
      })
      .catch(err => {
        this.setState({ loading: false })
      });
  };

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  };
};

export default withErrorHandler(Orders, axios);
