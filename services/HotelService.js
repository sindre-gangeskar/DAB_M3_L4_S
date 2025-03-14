class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.Rate = db.Rate;
        this.User = db.User;
    }

    async create(name, location) {
        return this.Hotel.create(
            {
                Name: name,
                Location: location
            }
        ) 
    }

    async get() {
        return this.Hotel.findAll({
            where: {}
        })
    }

    async getHotelDetails(hotelId, userId) {
      const hotel =  await this.Hotel.findOne({
          where: {
              id: hotelId
          },
          include: {
              model: this.User,
              through: {
                  attributes: ['Value']
              }
          },
      });

        hotel.avg = hotel.Users.map(x => x.Rate.dataValues.Value).reduce((a, b) => a + b, 0) / hotel.Users.length;
        hotel.rated = hotel.Users.filter(x => (x.dataValues.id === userId)).length > 0;
      return hotel
  }
    
    async deleteHotel(hotelId) {
        return this.Hotel.destroy({
            where: {id: hotelId}
        })
    }

    async makeARate(userId, hotelId, value) {
        return this.Rate.create(
            {
                UserId: userId,
                HotelId: hotelId,
                Value: value
            }
        ) 
    }
    async getBestRate() {
        return await this.Rate.findOne({
            order: [
                [ 'Value', 'Desc' ]  
            ],
        })
    }
}
module.exports = HotelService;