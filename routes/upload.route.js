/**========================================================================
 *                           Path: '/api/upload'
 *========================================================================**/

const { Router } = require("express");
const fileUpload = require("express-fileupload");
const {
  uploadIMGToCollection,
  getImg,
} = require("../controllers/upload.controller");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.use(fileUpload());
/**======================
 *    put :table:img
 *========================**/
router.put("/:table/:id", validateJWT, uploadIMGToCollection);
/*==== END OF put :table:img ====*/
/**======================
 *    put :table:img
 *========================**/
router.get("/:table/:photo", validateJWT, getImg);
/*==== END OF put :table:img ====*/

module.exports = router;
