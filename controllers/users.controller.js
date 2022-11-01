const db = require("../models/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
module.exports.getAll = (req, res) => {
  // phân trang page size và curent index
  let { page_size, page_index } = req.query;
  console.log(page_size, page_index);
  // check nếu bọn này không tồn tại thì trả về page size bản ghi đầu tiên
  page_index = Number(page_index) || 1;
  page_size = Number(page_size) || 3;

  // nếu tồn tại thì trả về page size và current index...
  db.execute(
    `SELECT * FROM tbl_users LIMIT ${page_size} OFFSET ${
      (page_index - 1) * page_size
    }`,
    [page_size, (page_index - 1) * page_size]
  )
    .then((data) => {
      let [rows, cols] = data;
      console.log(rows);
      // array destructuring
      // let rows = data[0];
      // let cols = data[1];
    })
    .catch((err) => console.log(err));
};

module.exports.getOne = (req, res) => {
  req.params.id;
  db.execute("SELECT * FROM tbl_users WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;

      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.create = (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }
  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }
  password = bcrypt.hashSync(password, saltRounds);
  let id = Math.floor(Math.random() * 1000000);
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      // 1 mảng chứa 1 phần tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        res.status(404).json({ message: "User already exitst" });
      } else {
        return db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?, ?, ?)", [
          id,
          null,
          null,
          email,
          null,
          null,
          password,
        ]);
      }
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Create one successfully" });
    })
    .catch((err) => console.log(err));
};

module.exports.update = (req, res) => {
  let { id } = req.params;
  // let id = req.params.id;
  let { name, username, phone, website, password } = req.body;
  db.execute(
    "UPDATE tbl_users SET name = ?, username = ?, phone = ?, website = ?, password = ? WHERE id = ?",
    [name, username, phone, website, password, id]
  )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getDelete = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_users WHERE id = ?", [id])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};
