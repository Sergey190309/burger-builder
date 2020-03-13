import axios from "axios";

import * as actionTypes from "./actions.types";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, id) => {
  // console.log("[auth.actions]authSuccess(data)", data)
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: id
  };
};

export const authFail = (error) => {
  // console.log(error);
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignIn) => {
  console.log("isSignIn - ", isSignIn);
  return dispatch => {
    dispatch(authStart());
    const url = isSignIn
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoo1N00atv0BYcKfalY7Qj-L85LD1t9Go"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoo1N00atv0BYcKfalY7Qj-L85LD1t9Go"
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post(url, authData)
      .then(response => {
        // console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        // console.log("Error: ", err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};
