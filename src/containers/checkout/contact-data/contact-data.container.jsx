import React from "react";

import Button from "../../../components/UI/button/button.component";
import Spinner from "../../../components/UI/spinner/spinner.component";
import axios from "../../../axios-orders";

import classes from "./contact-data.module.css";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: ""
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Sergey Kniazev",
        address: {
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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false });
      });

  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your e-mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="zipCode" placeholder="Your postal code" />
        <Button
          btnType="Success"
          clicked={this.orderHandler}
        >Order</Button>
      </form>
    );
    if (this.state.loading) { form = <Spinner /> };
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  };
};

export default ContactData;
