import React from "react";

import BuildControl from "./build-control/build-control.component";
import classes from "./build-controls.module.css";

const constrols = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"}
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current price is <strong>{props.price.toFixed(2)}</strong></p>
    {constrols.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >Order now</button>
  </div>
);

export default buildControls;
