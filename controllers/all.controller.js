const { response } = require("express");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model");
/**============================================
 *               get all
 *=============================================**/
const getAll = async (req, resp = response) => {
  const search = req.params.search;
  const regexp = new RegExp(search, "i");
  try {
    const [doctors, users, hospitals] = await Promise.all([
      Doctor.find({ name: regexp }),
      User.find({ name: regexp }),
      Hospital.find({ name: regexp }),
    ]);

    resp.status(200).json({
      ok: true,
      doctors,
      users,
      hospitals,
      search,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF get all ==============*/
/**============================================
 *               get document form table
 *=============================================**/
const getDocumentsCollections = async (req, resp = response) => {
  const search = req.params.search;
  const table = req.params.table;
  const regexp = new RegExp(search, "i");
  let data = [];
  try {
    switch (table) {
      case "hospital":
        data = await Hospital.find({ name: regexp }).populate(
          "user",
          "name img"
        );
        break;
      case "doctor":
        data = await Doctor.find({ name: regexp })
          .populate("user", "name img")
          .populate("hospital", "name img");
        break;
      case "user":
        data = await User.find({ name: regexp });
        break;

      default:
        return resp.status(400).json({
          ok: false,
          msg: "table only can be User or Doctor or User",
        });
        break;
    }
    resp.status(200).json({
      ok: true,
      data,
      table,
      search,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF get all ==============*/

module.exports = {
  getAll,
  getDocumentsCollections,
};
