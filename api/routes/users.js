var express = require('express');
var router = express.Router();
const passport = require('passport');
const users = require('../controller/users');
const catchAsync = require('../utils/catchAsync')


router.route("/register")
  .post(catchAsync(users.register))

router.route("/login")
  .post(passport.authenticate('local'), users.login)

router.route("/logout")
  .get(users.logout)
  
router.route("/check")
  .get(users.check)

module.exports = router;
