const { check } = require("express-validator");

export const CustomerCreateValidation = [

    check("content")
       .isString()
       .withMessage("content field must be string")
       .trim(),
  
];

