import React from "react";

import BurgerIngredient from "./burger-ingredient/burger-ingredient.components";

import classes from "./burger.module.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
        .map((_, index) => {
          return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    })
    .reduce((acc, el) => {
      return acc.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    // @ts-ignore
    transformedIngredients = <p>Please, start adding ingredients!</p>
  };
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-buttom" />
    </div>
  );
};

// export default withRouter(burger);
export default burger;
