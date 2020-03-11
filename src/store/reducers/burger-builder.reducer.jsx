import * as actionTypes from "../actions/actions.types";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  prices: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + state.prices[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - state.prices[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      let totalPrice = action.initData.initialPrice;

      totalPrice = Object.keys(action.initData.ingredients).map((type) => (
        action.initData.ingredients[type] * action.initData.prices[type]
        )).reduce((sum, value) => (sum + value), totalPrice);

      return {
        ...state,
        ingredients: {
          salad: action.initData.ingredients.salad,
          bacon: action.initData.ingredients.bacon,
          cheese: action.initData.ingredients.cheese,
          meat: action.initData.ingredients.meat
        },
        totalPrice: totalPrice,
        error: false,
        prices: action.initData.prices
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  };
  // return state;
};

export default reducer;
