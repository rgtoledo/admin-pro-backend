/**========================================================================
 *                           Path: '/api/auth/'
 *========================================================================**/

const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
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

module.exports = router;
