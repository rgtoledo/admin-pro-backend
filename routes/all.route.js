/**========================================================================
 *                           Path: '/api/all'
 *========================================================================**/

const { Router } = require("express");
const {
  getAll,
  getDocumentsCollections,
} = require("../controllers/all.controller");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
/**======================
 *    get all:search
 *========================**/
router.get("/:search", validateJWT, getAll);
/*==== END OF get all:search ====*/
/**======================
 *    get all:table:search
 *========================**/
router.get("/collection/:table/:search", validateJWT, getDocumentsCollections);
/*==== END OF get all:table:search ====*/

module.exports = router;
