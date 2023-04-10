/**========================================================================
 *                           Path: '/api/hospital'
 *========================================================================**/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getHospitals,
  deleteHospital,
  createHospital,
  updateHospital,
} = require("../controllers/hospital.controller");

const router = Router();

/**======================
 *    get hospitals
 *========================**/
router.get("/", validateJWT, getHospitals);
/*==== END OF get hospitals ====*/
/**======================
 *    post hospital
 *========================**/
router.post(
  "/",
  [
    validateJWT,
    check("name", `hospital's name required`).not().isEmpty(),
    validateField,
  ],
  createHospital
);
/*==== END OF post hospital ====*/

/**======================
 *    put hospital
 *========================**/
router.put("/:id", [validateJWT], updateHospital);
/*==== END OF put hospital ====*/
/**======================
 *    put hospital
 *========================**/
router.delete("/:id", [validateJWT], deleteHospital);
/*==== END OF put hospital ====*/

module.exports = router;
