const bookingModel = require('../models/booking.models');

class BookingRepository {
    // Create a new booking
    createBooking = async (data) => {
        try {
            const booking = new bookingModel(data);
            await booking.save();
            return booking;
        } catch (error) {
            throw new Error('Error creating booking: ' + error.message);
        }
    };

    // Retrieve all bookings
    getAllBookings = async () => {
        try {
            const bookings = await bookingModel.find();
            return bookings;
        } catch (error) {
            throw new Error('Error fetching bookings: ' + error.message);
        }
    };

    // Retrieve a booking by ID
    getBookingById = async (id) => {
        try {
            const booking = await bookingModel.findById(id);
            if (!booking) throw new Error('Booking not found');
            return booking;
        } catch (error) {
            throw new Error('Error fetching booking: ' + error.message);
        }
    };

    // Update a booking by ID
    updateBooking = async (id, data) => {
        try {
            const booking = await bookingModel.findByIdAndUpdate(id, data, { new: true });
            if (!booking) throw new Error('Booking not found');
            return booking;
        } catch (error) {
            throw new Error('Error updating booking: ' + error.message);
        }
    };

    // Delete a booking by ID
    deleteBooking = async (id) => {
        try {
            const booking = await bookingModel.findByIdAndDelete(id);
            if (!booking) throw new Error('Booking not found');
            return booking;
        } catch (error) {
            throw new Error('Error deleting booking: ' + error.message);
        }
    };
}

module.exports = new BookingRepository();