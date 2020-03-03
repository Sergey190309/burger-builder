import React from "react";

import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/burger/burger.component";

class BurgerBuilder extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };



  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <div>Build controls</div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
