const express = require('express');
const router = express.Router();
const db = require('../models');
const HotelService = require('../services/HotelService');
const UserService = require('../services/UserService');

const hotelService = new HotelService(db);
const userService = new UserService(db);


router.get('/', async function (req, res, next) {
    if (req.user) {
        const user =  await userService.getOne(req.user.id);
        if (user === null) {
            next(createError(404));
            return;
        }
        res.render('userDetails', { user: user, userId: req.user.id, isAdmin : req.user?.role === 'Admin', username: req.user.username });
    }
    else {
        const rate = await hotelService.getBestRate();
        if (rate === null) {
            next(createError(404));
            return;
        }

        const hotel = await hotelService.getHotelDetails(rate.HotelId, null);
        if (hotel === null) {
            next(createError(404));
            return;
        }
         res.render('hotelDetails', { hotel: hotel, rate: rate, userId: req.user?.id ?? 0, isAdmin: req.user?.role === 'Admin', username: req.user?.username ?? 'Guest' });
    }


})

module.exports = router;

