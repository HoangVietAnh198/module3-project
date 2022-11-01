const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// "/user"

// Get all
router.get("/", userController.getAll);

// Get one by Id
router.get("/:id", userController.getOne);

// Create one by Id
router.post("/", userController.create);

// Update one by Id
router.put("/:id", userController.update);

// Delete one by Id
router.delete("/:id", userController.getDelete);

module.exports = router;
