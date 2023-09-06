const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const router = require("./router/router");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(router);

app.listen(process.env.PORT, () => {});
