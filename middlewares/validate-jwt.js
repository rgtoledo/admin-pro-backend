const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, resp = response, next) => {
  const token = req.header("x-token");

  if (!token)
    return resp.status(400).json({
      ok: false,
      msg: "token not provided or invalid",
    });
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      msg: "token not provided or invalid",
    });
  }
};

module.exports = {
  validateJWT,
};
