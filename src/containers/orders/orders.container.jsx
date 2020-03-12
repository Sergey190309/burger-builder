import React from "react";
import { connect } from "react-redux";

import Order from "../../components/order/order.component";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/with-error-handler/with-error-handler.component";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/spinner/spinner.component";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchorder();
    // axios.get("/orders")

    // axios.get("/orders.json")
    //   .then(res => {
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     // console.log("orders.container", fetchedOrders);
    //     this.setState({ loading: false, orders: fetchedOrders })
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false })
    //   });
  };

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map( order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    }
    return orders;
  };
};

const mapStateToProps = state => {
  return {
      orders: state.order.orders,
      loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(
    withErrorHandler(Orders, axios)
  );
