const { response } = require("express");
const { validationResult } = require("express-validator");

const validateField = (req, resp = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      msg: "errors in data",
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validateField,
};
