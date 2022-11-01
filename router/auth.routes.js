const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
// define routes
// "/registes" --> sử dụng users.controller craeteUser

//"/login" --> Tạo controller cho auth.controller vỡi tên là login thực hiện tìm kiếm trong db xem có user không
// nếu không --> trả về người dùng không tồn tại
// nếu có --> check pass
//          --> Nếu đúng trả về res.json({ mess : "Login successfully"})
//          --> Nếu sai trả về res.json({message : "wrong passord"})
router.get("/register", (req, res) => {
  res.send("This is register page");
});
router.post("/register", userController.create);

router.post("/login", authController.login);
router.post("/register", authController.renderRegister);

module.exports = router;
