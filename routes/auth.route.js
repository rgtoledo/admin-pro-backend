/**========================================================================
 *                           Path: '/api/auth/'
 *========================================================================**/

const { Router } = require("express");
const {
  login,
  loginGoogle,
  renewToken,
} = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

/**======================
 *    post login
 *========================**/
router.post(
  "/",
  [
    check("pass", "password requiered").not().isEmpty(),
    check("email", "invalid email").isEmail(),
    validateField,
  ],
  login
);
/*==== END OF post login ====*/
/**======================
 *    post Googlelogin
 *========================**/
router.post(
  "/google",
  [check("googletoken", "googletoken required").not().isEmpty(), validateField],
  loginGoogle
);
/*==== END OF post Googlelogin ====*/
/**======================
 *    get renew token
 *========================**/
router.get("/renew", validateJWT, renewToken);
/*==== END OF get renew token ====*/

module.exports = router;
