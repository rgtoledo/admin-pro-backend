const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

/**========================================================================
 *                           Express server
 *========================================================================**/
const app = express();

/**======================
 *    data base
 *========================**/
dbConnection();
// console.log(process.env);
/*==== END OF data base ====*/

/**======================
 *    cors
 *========================**/
app.use(cors());
/*==== END OF cors ====*/

/**======================
 *    public folder
 *========================**/
app.use(express.static("public"));

/**======================
 *    reading and parsing body
 *========================**/
app.use(express.json());
/*==== END OF reading and parsing body ====*/

app.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});

/**========================================================================
 *                           routes
 *========================================================================**/
app.use("/api/users", require("./routes/user.route"));
app.use("/api/hospital", require("./routes/hospital.route"));
app.use("/api/doctor", require("./routes/doctor.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/all", require("./routes/all.route"));
app.use("/api/upload", require("./routes/upload.route"));
/*============================ END OF routes ============================*/

/*============================ END OF express server ============================*/
