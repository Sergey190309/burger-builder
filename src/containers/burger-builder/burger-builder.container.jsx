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

// const INGREDIENT_PRICES = {
//   salad: .5,
//   cheese: .4,
//   meat: 1.3,
//   bacon: .7
// };


class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // ingredients: null,
      totalPrice: 0,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.ingredientPrices = null;
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
    this.setState({purchaseable: sum > 0});
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = this.ingredientPrices[type];
    // const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    this.setState(
      { ingredients: updatedIngredients, totalPrice: updatedPrice }
    );
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    const updatedIngredients = { ...this.state.ingredients };
    if (oldCount) {
      const updatedCount = oldCount - 1;
      updatedIngredients[type] = updatedCount
      const priceAddition = this.ingredientPrices[type];
      // const priceAddition = INGREDIENT_PRICES[type];
      const updatedPrice = oldPrice - priceAddition;
      this.setState(
        { ingredients: updatedIngredients, totalPrice: updatedPrice }
      );
      this.updatePurchaseState(updatedIngredients);
    };
  };

  purchaseHandling = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + " " + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push("price=" + this.state.totalPrice)
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
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
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandling}
            price={this.state.totalPrice}
            />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.state.totalPrice}
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
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
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
