const { check, param } = require("express-validator");

export const setProductValidation = [

    check("title")
    .isString()
    .withMessage("title field must be string")
    .trim(),

    check("content")
    .isString()
    .withMessage("content field must be string")
    .trim(),

    check("price")
    .toInt()
    .isNumeric()
    .withMessage("Price field must be number")

];

export const ProductCreateValidation = [
    check("title")
      .isString()
      .withMessage("title field must be string")
      .trim(),
  
    check("content")
    .isString()
    .withMessage("content field must be string")
    .trim(),
  
];
