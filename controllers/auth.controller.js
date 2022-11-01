const db = require("../models/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(cookieParser());

module.exports.renderRegister = (req, res) => {
  res.send("<h1>This is register page</h1>");
};
module.exports.renderLogin = (req, res) => {
  res.send("<h1>This is login page</h1>");
};
module.exports.login = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      if (data[0].length === 0) {
        res.status(404).json({
          message: "user is not exist",
        });
      } else {
        let passValid = bcrypt.compareSync(password, data[0][0].password);
        if (passValid === true) {
          console.log(data[0][0].id);
          res.cookie("userId", data[0][0].id, { signed: true });
          res.status(200).json({
            status: "success",
            message: "login ok",
          });
          // điều hướng người dùng sang trang "/"
          // set heaers
          // res.redirect // not working after set cookie (tìm kiếm để tìm lý do google)
        } else {
          res.status(404).json({
            message: "Wrong password",
          });
        }
      }
    })
    .catch((err) => console.log(err));
};
// authentication (xác thực) :
// Session ( phiên đăng nhập)
// Cookie
// Token (JWT- Json wed token, Bearer, ...)
// Search : authentication with Session (ExpressJS)
