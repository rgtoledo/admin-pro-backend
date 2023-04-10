const { response } = require("express");
const Hospital = require("../models/hospital.model");
/**============================================
 *               get hospitals
 *=============================================**/
const getHospitals = async (req, resp = response) => {
  try {
    const hospitals = await Hospital.find().populate("user", "name");
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
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return resp.status(404).json({
        ok: false,
        msg: "not hospital found",
      });
    }

    await Hospital.findByIdAndDelete(id);
    resp.status(200).json({
      ok: true,
      id,
      msg: "Hospital deleted",
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
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return resp.status(404).json({
        ok: false,
        msg: "not hospital found",
      });
    }
    const changesHospital = {
      ...req.body,
      user: uid,
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      changesHospital,
      { new: true }
    );

    resp.status(200).json({
      ok: true,
      updatedHospital,
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
