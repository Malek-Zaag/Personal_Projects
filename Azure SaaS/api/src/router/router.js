const express = require("express");

const router = express.Router();
const controller = require("../controller/controller");
router.get("/", controller.getDefault);
router.post("/signup", controller.createUser);
router.post("/login", controller.loginUser);
router.get("/user", controller.getUserByUsername);
router.post("/triggerPipeline", controller.triggerPipeline);
router.get("/pipelinestatusansible", controller.getPipelineStatusAnsible);
router.post("/ansiblepipeline", controller.installDockerOrMySql);
module.exports = router;
