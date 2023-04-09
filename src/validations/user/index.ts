const { check } = require("express-validator");

export const LoginValidation = [
    check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage("your password should have min and max length between 8-15")
        .matches(/\d/)
        .withMessage("your password should have at least one number"),
];

export const RegisterValidation = [
    check("firstName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
  
    check("lastName")
    .isLength({ min: 3 })
    .withMessage("the name must have minimum length of 3")
    .trim(),
  
    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),
  
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    check("isAdmin")
      .isBoolean()
      .withMessage("the isAdmin field must be boolean type")
      .trim(),
    
    check("isActive")
      .isBoolean()
      .withMessage("the isActive field must be boolean type")
      .trim(),
];

export const UserCreateValidation = [
    check("firstName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
  
    check("lastName")
    .isLength({ min: 3 })
    .withMessage("the name must have minimum length of 3")
    .trim(),
  
    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),
  
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    check("isAdmin")
      .isBoolean()
      .withMessage("the isAdmin field must be boolean type")
      .trim(),
    
    check("isActive")
      .isBoolean()
      .withMessage("the isActive field must be boolean type")
      .trim(),
];