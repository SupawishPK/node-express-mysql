const User = require("../models/user.model");

module.exports = {
  createUser: async (req, res) => {
    const body = req.body;
    const result = await new User().createUser(
      body.first_name,
      body.last_name,
      body.gender,
      body.email,
      body.password,
      body.number
    );
    res.json(result);
    res.end();
  },
  getUsersByUserId: async (req, res) => {
    const id = req.params.id;
    const result = await new User().getUsersByUserId(id);
    res.json(result);
    res.end();
  },
  getUsers: async (req, res) => {
    const result = await new User().getUsers();
    res.json(result);
    res.end();
  },
  updateUsers: async (req, res) => {
    const body = req.body;
    const result = await new User().updateUser(
      body.id,
      body.first_name,
      body.last_name,
      body.gender,
      body.email,
      body.password,
      body.number
    );
    res.json(result);
    res.end();
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const result = await new User().deleteUser(id);
    res.json(result);
    res.end();
  },
  login: async (req, res) => {
    const body = req.body;
    const result = await new User().loginUser(body.email, body.password);
    res.json(result);
    res.end();
  },
};
