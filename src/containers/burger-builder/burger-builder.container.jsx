import React from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/auxiliary/auxiliary";
import Burger from "../../components/burger/burger.component";
import BuildControls from "../../components/burger/build-controls/build-controls.component";
import Modal from "../../components/UI/modal/modal.component";
import OrderSummary from "../../components/burger/order-summary/order-summary.component";
import Spinner from "../../components/UI/spinner/spinner.component";
import withErrorHandler from "../../hoc/with-error-handler/with-error-handler.component";
import axios from "../../axios-orders";

import * as actionTypes from "../../store/actions.types";

class BurgerBuilder extends React.Component {
  state = {
      // ingredients: null,
      // totalPrice: 0,
      // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // console.log("burger-builder.container/componentDidMount", this.props.args );
    // axios.get("/base-info.json")
    //   .then(response => {
    //     const ingredients = response.data.ingredients;
    //     const prices = response.data.prices;
    //     let totalPrice = response.data.initialPrice;

    //     totalPrice = Object.keys(ingredients).map((type) => (
    //       ingredients[type] * prices[type]
    //     )).reduce((sum, value) => (sum + value), totalPrice);

    //     this.setState({
    //       ingredients: ingredients,
    //       totalPrice: totalPrice
    //     }, () => this.updatePurchaseState(ingredients));
    //     this.ingredientPrices = prices;

    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />
    // console.log("burger.builder:", this.props.ings);
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.ttlPrice}
            />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.ttlPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    };
    if (this.state.loading) {
      orderSummary = <Spinner />
    };

    return (
      <Aux>
        <Modal
          show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    ttlPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
