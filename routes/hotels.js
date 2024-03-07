var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var HotelService = require("../services/HotelService")
var db = require("../models");
var hotelService = new HotelService(db);
var { checkIfAuthorized, isAdmin } = require('./authMiddleware');


/* GET hotels listing. */
router.get('/', async function (req, res, next) {
  const isAdmin = req.user?.role === 'Admin';
  const userId = req.user?.id ?? 0;
  const username = req.user?.username ?? 'Guest';
  const hotels = await hotelService.get();

  if (req.query.location != null) {
    let hotels = await hotelService.get();
    hotels = hotels.includes(hotel => hotel.Location.toLowerCase() == req.query.location.toLowerCase());

    if (hotels.length > 0) {
      res.render('hotels', { hotels: hotels, userId, isAdmin, username, user: req.user });
    }
  }

  else {
    res.render('hotels', { hotels: hotels, userId, isAdmin, username, user: req.user });
  }
});


router.get('/:hotelId', async function (req, res, next) {
  const userId = req.user?.id ?? 0;
  const username = req.user?.username;
  const hotel = await hotelService.getHotelDetails(req.params.hotelId, userId, username);
  const isAdmin = req.user?.role === 'Admin' ?? false;
  console.log(req.user);
  res.render('hotelDetails', { hotel: hotel, userId, username, isAdmin });
});

router.post('/:hotelId/rate', checkIfAuthorized, jsonParser, async function (req, res, next) {
  let value = req.body.Value;
  let userId = req.body.UserId;
  await hotelService.makeARate(userId, req.params.hotelId, value);
  res.end()
});

router.post('/', checkIfAuthorized, isAdmin, jsonParser, async function (req, res, next) {
  let Name = req.body.Name;
  let Location = req.body.Location;
  await hotelService.create(Name, Location);
  res.end()
});

router.delete('/', checkIfAuthorized, isAdmin, jsonParser, async function (req, res, next) {
  let id = req.body.id;
  await hotelService.deleteHotel(id);
  res.end()
});

router.delete('/:id', checkIfAuthorized, isAdmin, jsonParser, async function (req, res, next) {
  await hotelService.deleteHotel(req.params.id);
  res.end()
});

module.exports = router;
