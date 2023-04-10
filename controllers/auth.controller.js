const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

/**============================================
 *                login
 *=============================================**/
const login = async (req, resp = response) => {
  const { email, pass } = req.body;
  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return resp.status(400).json({
        ok: false,
        msg: "user, password or both incorrect",
      });
    }
    const validPass = bcryptjs.compareSync(pass, userDB.pass);

    if (!validPass)
      return resp.status(400).json({
        ok: false,
        msg: "user, password or both incorrect",
      });

    /**======================
     *    generate JWT
     *========================**/
    const token = await generateJWT(userDB.id);

    resp.status(200).json({
      ok: true,
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
/*=============== END OF login ==============*/

/**============================================
 *                login with google
 *=============================================**/
const loginGoogle = async (req, resp = response) => {
  const { googletoken } = req.body;
  try {
    const { email, name, picture } = await googleVerify(googletoken);
    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        google: true,
        pass: "@googlepass",
        img: picture,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();

    const token = await generateJWT(user.id);

    resp.status(200).json({
      ok: true,
      googletoken,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(400).json({
      ok: false,
      msg: "google token invalid",
    });
  }
};
/*=============== END OF login with google ==============*/

/**============================================
 *               renew Token
 *=============================================**/

const renewToken = async (req, resp = response) => {
  const uid = req.uid;
  /**======================
   *    generate JWT
   *========================**/
  const token = await generateJWT(uid);

  resp.status(200).json({
    ok: true,
    uid,
    token,
  });
};

module.exports = {
  login,
  loginGoogle,
  renewToken,
};
