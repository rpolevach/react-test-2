import Validator from "validator";
import isEmpty from "lodash/isEmpty";

const validaiton = (data: { username: string; password: string }) => {
  let errors: { username?: string; password?: string } = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }

  console.log(errors);

  return {
    isValid: isEmpty(errors),
  };
};

export default validaiton;
