import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/input/input.component";
import Button from "../../components/UI/button/button.component";
import Spinner from "../../components/UI/spinner/spinner.component";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";
import { AUTH_CONFIG } from "./auth-from-config.container";
import classes from "./auth.module.css";

class Auth extends React.Component {
  state = {
    controls: AUTH_CONFIG,
    isSignIn: true,
    // formIsValid: true
    formIsValid: false
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    };
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignIn
    );
  };

  onSwitchHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ isSignIn: !prevState.isSignIn }));
  }

  render() {
    const title = this.state.isSignIn ? "Sign In" : "Sign Up";

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
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    };

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    const output = this.props.loading ? <Spinner /> :
      <div className={classes.Auth}>
        {authRedirect}
        <form>
          <h1>{title}</h1>
          {errorMessage}
          {form}
          <Button
            disabled={false}
            // disabled={!this.state.formIsValid}
            clicked={(event) => this.submitHandler(event)}
            btnType="Success">Submit</Button>
          <Button
            // disabled={!this.state.formIsValid}
            clicked={(event) => this.onSwitchHandler(event)}
            btnType="Danger">Switch to {
              this.state.isSignIn ? "Sign Up" : "Sign In"
            }</Button>
        </form>
      </div>

    return output;
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(actions.auth(email, password, isSignIn)),
    onSetAuthRedirectPath: () =>
      dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
