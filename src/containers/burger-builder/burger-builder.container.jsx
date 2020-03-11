import React from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/auxiliary/auxiliary";
import Burger from "../../components/burger/burger.component";
import BuildControls from "../../components/burger/build-controls/build-controls.component";
import Modal from "../../components/UI/modal/modal.component";
import OrderSummary from "../../components/burger/order-summary/order-summary.component";
import Spinner from "../../components/UI/spinner/spinner.component";
import withErrorHandler from "../../hoc/with-error-handler/with-error-handler.component";
import axios from "../../axios-orders"

import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
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

    let burger = this.props.err ? <p>Ingredients can't be loaded...</p> : <Spinner />
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
    ttlPrice: state.totalPrice,
    err: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () =>
      dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios)
  );
