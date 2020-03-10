import React from "react";

import Button from "../../../components/UI/button/button.component";
import Spinner from "../../../components/UI/spinner/spinner.component";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/input/input.component";

import classes from "./contact-data.module.css";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your e-mail",
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "best", displayValue: "The best" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, inputId) => {
    // console.log("contact-data.container", inputId, event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
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
