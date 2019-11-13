const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


function checkRole(role){
  return function (req,res,next){
    if(role === req.decodeJwt.role){
      next();
    } 
    else{
      res.status(403).json({message: `You don't have this level of access`}) //but user IS logged in
    }
  }
}
module.exports = router;
