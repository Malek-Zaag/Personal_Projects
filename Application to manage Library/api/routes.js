const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/api/", controller.simpleGetRequest);
router.get("/api/db", controller.dbCall);
router.get("/api/user/", controller.getAllUsers);
router.get("/api/books", controller.getAllBooks);
router.post("/api/user/signup", controller.signUp);
router.post("/api/user/login", controller.login);
router.post("/api/books/:bookid", controller.addReview);
router.post("/api/books", controller.addBook);

module.exports = { router };
