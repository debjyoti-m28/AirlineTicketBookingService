const { StatusCodes } = require('http-status-codes')
const { BookingService } = require("../services/index");

const bookingService =  new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully created a booking.",
            err: {}
        });
    } catch (error) {
        res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        })
    }
}

module.exports = {
    create
}