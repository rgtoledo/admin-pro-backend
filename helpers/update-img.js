const fs = require("fs");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");
const User = require("../models/user.model");
const updateIMG = async (table, id, fileName) => {
  switch (table) {
    case "doctor":
      const doctor = await Doctor.findById(id);
      return uploadData(doctor, table, fileName);
    case "hospital":
      const hospital = await Hospital.findById(id);
      return uploadData(hospital, table, fileName);
    case "user":
      const user = await User.findById(id);
      return uploadData(user, table, fileName);
    default:
      return false;
  }
};

const uploadData = async (data, table, fileName) => {
  if (!data) {
    console.log("object did not find");
    return false;
  } else {
    const oldPath = `./uploads/${table}/${data.img}`;
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    data.img = fileName;
    await data.save();
    return true;
  }
};

module.exports = { updateIMG };
