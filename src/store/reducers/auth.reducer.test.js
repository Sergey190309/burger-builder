import authReducer from "./auth.reducer";

import * as actions from "../actions/actions.types";
// import { shallow } from "enzyme";

describe('Auth reducer test', () => {
  // let wrapper;
  it('should return an initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    })
  });

  it('should updated state on getting userId and token', () => {
    expect(authReducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    }, {
        type: actions.AUTH_SUCCESS,
        token: 'some-token',
        userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: "/"
    })
  });
});
