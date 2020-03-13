export const AUTH_CONFIG = {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your e-mail, be carefull",
      },
      value: "sa@something.com",
      // value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password, min 6 chars",
      },
      value: "ksksksl",
      // value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
};
