const express = require("express");
const UserController = require("./controllers/users");

const routes = express.Router();

routes.get("/users", UserController.getUsers);
routes.post("/user", UserController.createUser);
routes.put("/user/:id", UserController.updateUser);

module.exports = routes;
