const db = require('../data/dbConfig');

module.exports = {
    add,
    findBy,
    findById,
}

async function add(user) {
     const [id] = await db("users").insert(user, 'id');
     return findById(id);
   }
  
  function findById(id) {
      return db('users')
      .where('id', id)
      .first()
  }

  function findBy(filter) {
      return db("users")
      .where(filter);
  }
