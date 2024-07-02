const addressModel = require('./models/address.models');

class AddressRepository {

    // Create a new address
    createAddress = async (data) => {
        try {
            const address = new addressModel(data);
            await address.save();
            return address;
        } catch (error) {
            throw new Error('Error creating address: ' + error.message);
        }
    };

    // Retrieve all addresses
    getAllAddresses = async () => {
        try {
            const addresses = await addressModel.find();
            return addresses;
        } catch (error) {
            throw new Error('Error fetching addresses: ' + error.message);
        }
    };

    // Retrieve an address by ID
    getAddressById = async (id) => {
        try {
            const address = await addressModel.findById(id);
            if (!address) throw new Error('Address not found');
            return address;
        } catch (error) {
            throw new Error('Error fetching address: ' + error.message);
        }
    };

    // Update an address by ID
    updateAddress = async (id, data) => {
        try {
            const address = await addressModel.findByIdAndUpdate(id, data, { new: true });
            if (!address) throw new Error('Address not found');
            return address;
        } catch (error) {
            throw new Error('Error updating address: ' + error.message);
        }
    };

    // Delete an address by ID
    deleteAddress = async (id) => {
        try {
            const address = await addressModel.findByIdAndDelete(id);
            if (!address) throw new Error('Address not found');
            return address;
        } catch (error) {
            throw new Error('Error deleting address: ' + error.message);
        }
    };


};


module.exports = new AddressRepository();