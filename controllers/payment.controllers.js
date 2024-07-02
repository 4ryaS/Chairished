const PaymentRepository = require('../repositories/payment.repositories');

const createPayment = async (req, res) => {
    const { user, amount, paymentDate, status } = req.body;
    const data = { user, amount, paymentDate, status };

    try {
        const createdPayment = await PaymentRepository.createPayment(data);
        return res.status(201).json(createdPayment);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating payment');
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentRepository.getAllPayments();
        return res.json(payments);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching payments');
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await PaymentRepository.getPaymentById(id);
        return res.json(payment);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching payment');
    }
};

const updatePaymentById = async (req, res) => {
    const { id } = req.params;
    const { user, amount, paymentDate, status } = req.body;
    const data = { user, amount, paymentDate, status };

    try {
        const updatedPayment = await PaymentRepository.updatePaymentById(id, data);
        return res.json(updatedPayment);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error updating payment');
    }
};

const deletePaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await PaymentRepository.deletePaymentById(id);
        return res.json(deletedPayment);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting payment');
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
