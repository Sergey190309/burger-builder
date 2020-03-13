export const CONTACT_CONFIG = {
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
};
