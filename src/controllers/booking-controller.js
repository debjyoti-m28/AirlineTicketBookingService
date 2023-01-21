const { StatusCodes } = require('http-status-codes')
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService =  new BookingService();

const  sendMessageToQueue = async (req, res) => {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is notification from queue',
                content: 'Some queue will subscribe this...',
                recepientEmail: 'mdebjyoti28@gmail.com',
                notificationTime: '2023-01-21T09:20:20'
            },
            service: 'CREATE_TICKET' //unique key
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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