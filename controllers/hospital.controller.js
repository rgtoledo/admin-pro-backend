const { response } = require("express");
const Hospital = require("../models/hospital.model");
/**============================================
 *               get hospitals
 *=============================================**/
const getHospitals = async (req, resp = response) => {
  try {
    const hospitals = await Hospital.find()
    .populate('user', 'name');
    resp.status(200).json({
      ok: true,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF get hospitals ==============*/

/**============================================
 *               delete hospital
 *=============================================**/
const deleteHospital = async (req, resp = response) => {
  try {
    resp.status(200).json({
      ok: false,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF delete hospital ==============*/

/**============================================
 *              update hospital
 *=============================================**/
const updateHospital = async (req, resp = response) => {
  try {
    resp.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF update hospital ==============*/

/**============================================
 *               create hospital
 *=============================================**/
const createHospital = async (req, resp = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    resp.status(200).json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF hospital user ==============*/

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
