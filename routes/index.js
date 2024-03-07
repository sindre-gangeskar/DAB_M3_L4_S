var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
	const userId = req.user?.id ?? 0;
	const username = req.user?.username ?? 'Guest';
	const isAdmin = req.user?.role === 'Admin' ?? false;

	res.render('index', { title: 'Hotel Booking', userId, username, isAdmin });
});

module.exports = router;
