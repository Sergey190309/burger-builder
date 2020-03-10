import React from "react";

import Order from "../../components/order/order.component";

class Orders extends React.Component {
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  };
};

export default Orders;
