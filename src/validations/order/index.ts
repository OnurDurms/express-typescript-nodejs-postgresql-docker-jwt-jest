const { check } = require("express-validator");

export const OrderCreateValidation = [

    check("title")
      .isString()
      .withMessage("title field must be string")
      .trim(),

    check("content")
      .isString()
      .withMessage("content field must be string")
      .trim(),
  
];

