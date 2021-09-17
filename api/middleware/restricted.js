const { JWT_SECRET } = require("../../secrets/index");
const jwt = require('jsonwebtoken');
const Users = require("../../users/users-model.js");

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
  res.json({ status: 401, message: "token required"})
   next()
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err)
      res.json({ 
        status: 401, message: "token invalid"
      })
      req.decodedToken = decodedToken
      next()
    }
  )
}

  const checkIfUsernameExists = async (req, res, next) => {
    
       const user = await Users.findBy({username: req.body.username})
       if (!user) {
         next({ status: 422, message: "username taken"})
       } else if (!req.body.username || !req.body.password) { 
         next({ status: 422, message: "username and password required"})
        } else {
         next()
       }
   
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */


module.exports = {
  restricted,
  checkIfUsernameExists
}