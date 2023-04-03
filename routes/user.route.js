/**========================================================================
 *                           Path: '/api/users'
 *========================================================================**/

const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUsers,
} = require("../controllers/user.controller");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

/**======================
 *    get users
 *========================**/
router.get("/", validateJWT, getUsers);
/*==== END OF get users ====*/
/**======================
 *    delete users
 *========================**/
router.delete("/:id", validateJWT, deleteUsers);
/*==== END OF delete users ====*/

/**======================
 *    post user
 *========================**/
router.post(
  "/",
  [
    check("name", "name required").not().isEmpty(),
    check("pass", "password requiered").not().isEmpty(),
    check("email", "invalid email").isEmail(),
    validateField,
  ],
  createUser
);
/*==== END OF post user ====*/

/**======================
 *    put user
 *========================**/
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "name required").not().isEmpty(),
    check("pass", "password requiered").not().isEmpty(),
    check("role", "role requiered").not().isEmpty(),
    validateField,
  ],
  updateUser
);
/*==== END OF put user ====*/

module.exports = router;
