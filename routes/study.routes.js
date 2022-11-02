const express = require("express");
const router = express.Router();
const studyController = require("../controllers/study.controller");
const userController = require("../controllers/users.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

router.get("/question/:1", studyController.renderQuestion);

router.post(
  "/question/:id",
  upload.single("image"),
  userController.createQuestions
);

router.get("/register", authController.renderRegister);

router.post("/register", userController.createUser);

router.get("/login", authController.renderLogin);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
