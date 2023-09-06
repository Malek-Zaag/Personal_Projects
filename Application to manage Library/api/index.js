const express = require("express");
const app = express();
const cors = require("cors");
const bp = require("body-parser");
const { router } = require("./routes");
require("dotenv").config();
const corsOptions = {
  origin: true,
  Credentials: true,
  corsOptions: true,
};

app.use(cors(corsOptions));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use(router);

require("./model");
