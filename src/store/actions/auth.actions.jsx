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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeOut = (expTime) => {
  return dispatch => {
    // console.log(expTime);
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000)
  };
};

export const auth = (email, password, isSignIn) => {
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
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expDate", expDate.toUTCString());
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    authPath: path

  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem("expDate"));
      if (expDate <= new Date()) {
        dispatch(logout);
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeOut((expDate.getTime() - new Date().getTime())/1000));
      };
    };
  };
};
