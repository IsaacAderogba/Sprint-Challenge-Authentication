const Auth = require("./model");

module.exports = {
  getUsers: async function() {
    return await Auth.findUsers();
  },
  getUserById: async function(id) {
    return await Auth.findUserById(id);
  },
  postUser: async function(user) {
    return await Auth.insertUser(user);
  },
  deleteUser: async function(id) {
    return await Auth.removeUser(id);
  }
};
