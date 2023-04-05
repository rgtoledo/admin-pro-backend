const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateIMG } = require("../helpers/update-img");
const path = require("path");
const fs = require("fs");

/**============================================
 *               put upload a document to a table
 *=============================================**/
const uploadIMGToCollection = async (req, resp = response) => {
  const id = req.params.id;
  const table = req.params.table;
  const img = req.files.img;

  const cutFileName = img.name.split(".");
  const fileExtension = cutFileName[cutFileName.length - 1];

  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileExtension))
    return resp.status(400).json({
      ok: false,
      msg: "invalid extension",
      extension: fileExtension,
    });

  //   let data = [];
  try {
    const tableTypes = ["user", "doctor", "hospital"];

    if (!tableTypes.includes(table)) {
      return resp.status(400).json({
        ok: false,
        msg: "table only can be User or Doctor or User",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return resp.status(400).json({
        ok: false,
        msg: "not file uploaded",
      });
    }

    /**======================
     *    file name
     *========================**/
    const fileName = `${uuidv4()}.${fileExtension}`;
    /**======================
     *    path img
     *========================**/
    const filePath = `./uploads/${table}/${fileName}`;

    // Use the mv() method to place the file somewhere on your server
    img.mv(filePath, (err) => {
      if (err) {
        console.log(err);
        return resp.status(500).json({
          ok: false,
          msg: "error uploading the img",
        });
      }

      const ifupload = updateIMG(table, id, fileName);

      if (!ifupload) {
        resp.status(500).json({
          ok: false,
          msg: "object did not find",
        });
      }

      resp.status(200).json({
        ok: true,
        msg: "file uploaded",
        file: fileName,
      });
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
 *               get upload img
 *=============================================**/
const getImg = (req, resp = response) => {
  const { table, photo } = req.params;
  let pathImg = path.join(__dirname, `../uploads/${table}/${photo}`);

  /**======================
   *    default img
   *========================**/
  if (!fs.existsSync(pathImg))
    pathImg = path.join(__dirname, `../uploads/no-image.png`);

  resp.sendFile(pathImg);
};
/*=============== END OF get upload img ==============*/

module.exports = {
  uploadIMGToCollection,
  getImg,
};
