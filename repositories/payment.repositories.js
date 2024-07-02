// payment.repositories.js

const paymentModel = require('../models/payment.model');

const createPayment = async (data) => {
    try {
        const payment = new paymentModel(data);
        await payment.save();
        return payment;
    } catch (error) {
        throw new Error('Error creating payment: ' + error.message);
    }
};

const getAllPayments = async () => {
    try {
        const payments = await paymentModel.find();
        return payments;
    } catch (error) {
        throw new Error('Error fetching payments: ' + error.message);
    }
};

const getPaymentById = async (id) => {
    try {
        const payment = await paymentModel.findById(id);
        if (!payment) throw new Error('Payment not found');
        return payment;
    } catch (error) {
        throw new Error('Error fetching payment: ' + error.message);
    }
};

const updatePaymentById = async (id, data) => {
    try {
        const payment = await paymentModel.findByIdAndUpdate(id, data, { new: true });
        if (!payment) throw new Error('Payment not found');
        return payment;
    } catch (error) {
        throw new Error('Error updating payment: ' + error.message);
    }
};

const deletePaymentById = async (id) => {
    try {
        const payment = await paymentModel.findByIdAndDelete(id);
        if (!payment) throw new Error('Payment not found');
        return payment;
    } catch (error) {
        throw new Error('Error deleting payment: ' + error.message);
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
