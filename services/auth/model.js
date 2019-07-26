const db = require("../../database/dbConfig");

module.exports = {
  findUsers: function() {
    return db("users");
  },
  findUserById: function(id) {
    return db("users")
      .where({ id })
      .first();
  },
  insertUser: function(user) {
    return db("users")
      .insert(user)
      .then(([id]) => this.findUserById(id));
  },
  removeUser: async function(id) {
    const userToDelete = await this.findUserById(id);
    return db("users")
      .where({ id })
      .del()
      .then(() => userToDelete);
  }
};