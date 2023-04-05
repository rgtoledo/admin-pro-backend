/**========================================================================
 *                           Path: '/api/doctor'
 *========================================================================**/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctor,
} = require("../controllers/doctor.controller");

const router = Router();

/**======================
 *    get doctors
 *========================**/
router.get("/", validateJWT, getDoctors);
/*==== END OF get doctors ====*/
/**======================
 *    delete doctor
 *========================**/
router.delete("/:id", validateJWT, deleteDoctor);
/*==== END OF delete doctor ====*/

/**======================
 *    post doctor
 *========================**/
router.post(
  "/",
  [
    validateJWT,
    check("name", `doctor's name required`).not().isEmpty(),
    check("hospital", `invalid hospital`).isMongoId(),
    validateField,
  ],
  createDoctor
);
/*==== END OF post doctor ====*/

/**======================
 *    put doctor
 *========================**/
router.put("/:id", [validateJWT], updateDoctor);
/*==== END OF put doctor ====*/

module.exports = router;
