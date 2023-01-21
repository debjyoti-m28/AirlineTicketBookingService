const axios = require('axios');
const { BookingRepository } =  require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const ServiceError = require('../utils/errors/service-error');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            //getting the flight details by id from Flight and search service
            const flightId =  data.flightId;
            const getFlightResquestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightResquestURL);
            const flightData = flight.data.data;
            
            // calculate total cost and add to payload
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight')
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost}

            // create thr booking
            const booking = await this.bookingRepository.create(bookingPayload);

            //update the no of seats left in the flight service database
            const updateFlightResquestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightResquestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            
            //update the booking status
            const finalBooking = await this.bookingRepository.update(booking.id, {status: 'Booked'});
            return finalBooking;

            //send ticket creation notification to Remider service

        } catch (error) {
            if(error.name === 'RepositoryError' || error.name === 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;