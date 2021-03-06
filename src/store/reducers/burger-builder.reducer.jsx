import * as actionTypes from "../actions/actions.types";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  prices: null,
  building: false
};

const addIngredient = ( state, action ) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + state.prices[action.ingredientName],
    building: true
  }
  return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
  const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
  const updatedIngs = updateObject( state.ingredients, updatedIng );
  const updatedState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - state.prices[action.ingredientName],
    building: true
  }
  return updateObject( state, updatedState );
};

const setIngredinents = (state, action) => {
  let totalPrice = action.initData.initialPrice;
  totalPrice = Object.keys(action.initData.ingredients).map((type) => (
    action.initData.ingredients[type] * action.initData.prices[type]
    )).reduce((sum, value) => (sum + value), totalPrice);
return updateObject(state, {
    ingredients: {
      salad: action.initData.ingredients.salad,
      bacon: action.initData.ingredients.bacon,
      cheese: action.initData.ingredients.cheese,
      meat: action.initData.ingredients.meat
    },
    totalPrice: totalPrice,
    error: false,
    prices: action.initData.prices,
    building: false
  })
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject( state, { error: true } );
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredinents(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  };
};

export default burgerBuilderReducer;
