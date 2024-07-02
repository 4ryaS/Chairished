const AddressRepository = require('../repositories/address.repositories');

const createAddress = async (req, res) => {
    const { street, city, country } = req.body;
    const data = { street, city, country };

    try {
        const createdAddress = await AddressRepository.createAddress(data);
        return res.status(201).json(createdAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating address');
    }
};

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await AddressRepository.getAllAddresses();
        return res.json(addresses);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching addresses');
    }
};

const getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await AddressRepository.getAddressById(id);
        return res.json(address);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching address');
    }
};

const updateAddressById = async (req, res) => {
    const { id } = req.params;
    const { street, city, country } = req.body;
    const data = { street, city, country };

    try {
        const updatedAddress = await AddressRepository.updateAddressById(id, data);
        return res.json(updatedAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error updating address');
    }
};

const deleteAddressById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAddress = await AddressRepository.deleteAddressById(id);
        return res.json(deletedAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting address');
    }
};

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddressById,
    deleteAddressById
};
