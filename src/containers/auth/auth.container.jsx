import React from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/input/input.component";
import Button from "../../components/UI/button/button.component";
import * as actions from "../../store/actions/index";
import { AUTH_CONFIG } from "./auth-from-config.container";
import classes from "./auth.module.css";

class Auth extends React.Component {
  state = {
    controls: AUTH_CONFIG,
    formIsValid: true
    // formIsValid: false
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
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  };

  inputChangeHandler = (event, controlName) => {
    // console.log("state - ", this.state.controls);
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation),
        touched: true
      }
    };
    let formIsValid = true;
    for (let conlrolName in updatedControls) {
      formIsValid = updatedControls[conlrolName].valid && formIsValid;
    };

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler(event) {
    event.preventDefault();
    // console.log(this.state.controls);
    // console.log("email", this.state.controls.email.value);
    // console.log("password", this.state.controls.password.value);
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = formElementsArray.map(formElement => (
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
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={(event) => this.submitHandler(event)}>
          {form}
          <Button
            disabled={!this.state.formIsValid}
            btnType="Success">Submit</Button>
        </form>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
