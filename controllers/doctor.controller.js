const { response } = require("express");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");
/**============================================
 *               get doctors
 *=============================================**/
const getDoctors = async (req, resp = response) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name")
      .populate("hospital", "name");

    resp.status(200).json({
      ok: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF get doctors ==============*/

/**============================================
 *               delete docdoctorto
 *=============================================**/
const deleteDoctor = async (req, resp = response) => {
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
/*=============== END OF delete doctor ==============*/

/**============================================
 *              update doctor
 *=============================================**/
const updateDoctor = async (req, resp = response) => {
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
/*=============== END OF update doctor ==============*/

/**============================================
 *               create doctor
 *=============================================**/
const createDoctor = async (req, resp = response) => {
  const hospital = req.body.hospital;
  const uid = req.uid;

  const doctor = new Doctor({
    user: uid,
    hospital,
    ...req.body,
  });
  const ifhospital = await Hospital.findById(hospital);
  try {
    if (!ifhospital)
      return resp.status(400).json({
        ok: true,
        msg: "hospital does not exist",
      });

    const doctorDB = await doctor.save();

    resp.status(200).json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF hospital doctor ==============*/

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
