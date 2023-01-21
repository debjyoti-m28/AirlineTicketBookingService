const { StatusCodes } = require('http-status-codes')
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService =  new BookingService();

const  sendMessageToQueue = async (req, res) => {
        const channel = await createChannel();
        const data = {message: 'Success'};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Succesfully published the event'
        });
}

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
    create,
    sendMessageToQueue
}