import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is a required field")
      .isEmail()
      .withMessage("Email is not valid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is a required field")
      .isLowercase()
      .withMessage("Username needs to be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username needs to atleast 3 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is a required field")
      .isLength({ min: 8 })
      .withMessage("Password needs to have minimum of 8 characters "),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is a required field"),
  ];
};

const userChangePasswordValidator = () => {
  return [
    body("oldPass").notEmpty().withMessage("Old password is required"),
    body("newPass").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is a required field ")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPassword = () => {
  return [
    body("newPass").notEmpty().withMessage("New Password is a required field"),
    body("confirmNewPass").notEmpty().withMessage("This is a required field"),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPassword,
};
