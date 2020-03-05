import React from "react";

import Aux from "../../hoc/auxiliary/auxiliary";
import Burger from "../../components/burger/burger.component";
import BuildControls from "../../components/burger/build-controls/build-controls.component";
import Modal from "../../components/UI/modal/modal.component";
import OrderSummary from "../../components/burger/order-summary/order-summary.component";
import Spinner from "../../components/UI/spinner/spinner.component";
import withErrorHandler from "../../hoc/with-error-handler/with-error-handler.component";
import axios from "../../axios-orders";

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
      ingredients: null,
      totalPrice: 0,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.ingredientPrices = null;
  };

  componentDidMount() {

    axios.get("/base-info.json")
      .then(response => {
        const ingredients = response.data.ingredients;
        const prices = response.data.prices;
        let totalPrice = response.data.initialPrice;

        totalPrice = Object.keys(ingredients).map((type) => (
          ingredients[type] * prices[type]
        )).reduce((sum, value) => (sum + value), totalPrice);
        console.log("TotalPrice", totalPrice);

        this.setState({
          ingredients: ingredients,
          totalPrice: totalPrice
        }, () => this.updatePurchaseState(ingredients));
        this.ingredientPrices = prices;

      })
      .catch(error => {
        console.log("not loaded");
        this.setState({ error: true })
      });
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
    // alert("You continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Sergey Kniazev",
        addess: {
          street: "1, Test street, apt ZZZ",
          zipCode: "ZZZZZZ",
          country: "Russia"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    // this.purchaseCancelHandler();
    axios.post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandling}
          price={this.state.totalPrice}
          />
      </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
