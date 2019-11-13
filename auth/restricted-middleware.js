const jwt = require('jsonwebtoken')

// const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  
  const token = req.headers.authorization; //send token back via auth header

  if (token) {
    const secret = process.env.JWT_SECRET || 'coconuts'
    //once sign token, get access to decoadedToken! (to add to our request)
    jwt.verify(token, secret , (err, decoadedToken) => { //sign JWT with secret and use same secret to verify token
      if(err){
        res.status(401).json({message: `tampered token. invalid creds.`})
      }
      else{
        req.decodeJwt = decoadedToken; //adding decodedToken to the request
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
