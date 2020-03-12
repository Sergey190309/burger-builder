import React from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/button/button.component";
import Spinner from "../../../components/UI/spinner/spinner.component";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/input/input.component";
import withErrorHandler from "../../../hoc/with-error-handler/with-error-handler.component";
import * as actions from "../../../store/actions/index";

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
        value: "",
        // value: "Test",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        // value: "Test street",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        // value: "191002",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your e-mail",
        },
        value: "",
        // value: "test@test.com",
        validation: {
          required: true
        },
        valid: false,
        touched: false
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
        value: "fastest",
        validation: {},
        valid: true
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.ttlPrice,
      orderData: formData
    };
    console.log("[contact-data.container/orderHandler-order]", order)
    this.props.onOrderBurger(order);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) { return isValid };

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    // if (rules.isEmail) {
    //   const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //   isValid = pattern.test(value) && isValid
    // }
    // if (rules.isNumeric) {
    //   const pattern = /^\d+$/;
    //   isValid = pattern.test(value) && isValid
    // }

    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    // console.log("contact-data.container", inputId, event.target.value);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let formId in updatedOrderForm) {
      formIsValid = updatedOrderForm[formId].valid && formIsValid;
      // console.log("formId:", formId, "updatedOrderForm:", updatedOrderForm[formId].valid);
    };

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
            invalid={!formElement.config.valid}
            shouldValidate={!!formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          // disabled={false}
          disabled={!this.state.formIsValid}
        >Order</Button>
      </form>
    );
    if (this.props.loading) { form = <Spinner /> };
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
        {form}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    ttlPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
    withErrorHandler(ContactData, axios)
  );
