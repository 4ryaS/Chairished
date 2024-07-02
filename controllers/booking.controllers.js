const BookingRepository = require('../repositories/booking.repositories');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const booking = await BookingRepository.createBooking(req.body);
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingRepository.getAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a booking by ID
const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await BookingRepository.getBookingById(id);
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBooking = await BookingRepository.updateBooking(id, req.body);
        res.json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await BookingRepository.deleteBooking(id);
        res.json({ message: 'Booking deleted successfully', deletedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};
