import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .isEmpty()
      .withMessage("Email is a required field")
      .isEmail()
      .withMessage("Email is not valid"),
    body("username")
      .trim()
      .isEmpty()
      .withMessage("Username is a required field")
      .isLowercase()
      .withMessage("Username needs to be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username needs to atleast 3 characters long"),
    body("password")
      .trim()
      .isEmpty()
      .withMessage("Password is a required field")
      .isLength({ min: 8 })
      .withMessage("Password needs to have minimum of 8 characters "),
  ];
};

export { userRegisterValidator };
