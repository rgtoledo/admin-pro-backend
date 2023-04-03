const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
/**============================================
 *               get users
 *=============================================**/
const getUsers = async (req, resp = response) => {
  try {
    const users = await User.find({}, "name email role google");
    resp.status(200).json({
      ok: true,
      users,
      uid: req.uid,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF get users ==============*/
/**============================================
 *               delete users
 *=============================================**/
const deleteUsers = async (req, resp = response) => {
  const uid = req.params.id;

  try {
    const ifuser = await User.findByIdAndDelete(uid);
    console.log("user check --->", ifuser);

    if (ifuser)
      return resp.status(200).json({
        ok: true,
        ifuser,
      });

    resp.status(400).json({
      ok: false,
      msg: "user does not exist",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF delete users ==============*/

/**============================================
 *              update user
 *=============================================**/
const updateUser = async (req, resp = response) => {
  //TODO:   validate token and check user

  const uid = req.params.id;
  const { email, pass, google, ...fields } = req.body;
  try {
    const ifUserDB = await User.findById(uid);

    if (!ifUserDB) {
      return resp.status(404).json({
        ok: false,
        msg: "no user in data base",
      });
    }
    const ifemail = await User.findOne({ email });
    if (ifUserDB.email !== email && ifemail) {
      return resp.status(400).json({
        ok: false,
        msg: "email already taken",
      });
    }
    fields.email = email;
    const updateUser = await User.findByIdAndUpdate(uid, fields, { new: true });

    resp.json({
      ok: true,
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF update user ==============*/

/**============================================
 *               create user
 *=============================================**/
const createUser = async (req, resp = response) => {
  const { email, pass } = req.body;

  try {
    const ifEmail = await User.findOne({ email: email });

    if (ifEmail)
      return resp.status(400).json({
        ok: false,
        msg: "user already exist",
      });

    /**======================
     *    encrypt pass
     *========================**/
    const user = new User(req.body);
    const token = await generateJWT(user.uid);

    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);

    await user.save();

    resp.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "unexpected error... check logs",
    });
  }
};
/*=============== END OF create user ==============*/

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUsers,
};
