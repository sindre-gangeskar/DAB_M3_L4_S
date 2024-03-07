var express = require('express');
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var { canSeeUserDetails, canSeeUsersList, checkIfAuthorized, isAdmin } = require('./authMiddleware');

/* GET users listing. */
router.get('/:userId', canSeeUserDetails, async function (req, res, next) {
  const user = await userService.getOne(req.params.userId);

  if (user === null || user === undefined) {
    res.status(404).send('No such user exists');
  }
  else {
    const userId = req.user?.id ?? 0;
    const username = req.user?.username ?? 'Guest';
    const isAdmin = req.user?.role === 'Admin' ?? false;

    res.render('userDetails', { user: user, userId, username, isAdmin });
  }
});

router.get('/', canSeeUsersList, checkIfAuthorized, isAdmin, async function (req, res, next) {
  const userId = req.user?.id ?? 0;
  const users = await userService.getAll();
  const username = req.user?.username ?? 'Guest';
  const isAdmin = req.user?.role === 'Admin' ?? false;
  res.render('users', { users: users, userId: userId, username, isAdmin });
});

router.delete('/', checkIfAuthorized, isAdmin, jsonParser, async function (req, res, next) {
  let id = req.body.id;
  await userService.deleteUser(id);
  res.end()
});

module.exports = router;
