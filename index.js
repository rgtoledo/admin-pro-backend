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
console.log(process.env);
/*==== END OF data base ====*/

/**======================
 *    cors
 *========================**/
app.use(cors());
/*==== END OF cors ====*/

app.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});

/**========================================================================
 *                           routes
 *========================================================================**/

app.get("/", (req, resp) => {
  resp.status(200).json({
    ok: true,
    msg: "hello world",
  });
});

/*============================ END OF express server ============================*/
