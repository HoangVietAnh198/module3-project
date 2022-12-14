const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
const cookieParser = require("cookie-parser");
const db = require("./models/db");
const { notRequireAuth, requireAuth } = require("./middlewares/middlewares");

let userRoutes = require("./routes/users.routes");
// let authRoutes = require("./routes/auth.routes");
// const clearRoutes = require("./routes/clear.routes");

// set up view engines
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// use third-party middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser("quizlet pro"));

// app.get("/", (req, res) => {
//   res.render("adminview");
// });
app.use("", userRoutes);
console.log(12312312312312321313);
app.listen(port, () => {
  console.log("Server is running on port http://127.0.0.1:3000");
});
