import React from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/button/button.component";
import Spinner from "../../../components/UI/spinner/spinner.component";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/input/input.component";
import withErrorHandler from "../../../hoc/with-error-handler/with-error-handler.component";
import * as actions from "../../../store/actions/index";

import { CONTACT_CONFIG } from "./contact-data-form.config";
import classes from "./contact-data.module.css";

class ContactData extends React.Component {
  state = {
    orderForm: CONTACT_CONFIG,
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
      orderData: formData,
      userId: this.props.userId
    };
    // console.log("[contact-data.container/orderHandler-order]", order)
    this.props.onOrderBurger(order, this.props.token);
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  };

  inputChangeHandler = (event, inputId) => {
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
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
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
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
    withErrorHandler(ContactData, axios)
  );
