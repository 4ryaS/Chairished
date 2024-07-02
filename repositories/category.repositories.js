const categoryModel = require('../models/category.models');

class CategoryRepository {

    // Create a new category
    createCategory = async (data) => {
        try {
            const category = new categoryModel(data);
            await category.save();
            return category;
        } catch (error) {
            throw new Error('Error creating category: ' + error.message);
        }
    };

    // Retrieve all categories
    getAllCategories = async () => {
        try {
            const categories = await categoryModel.find();
            return categories;
        } catch (error) {
            throw new Error('Error fetching categories: ' + error.message);
        }
    };

    // Retrieve a category by ID
    getCategoryById = async (id) => {
        try {
            const category = await categoryModel.findById(id);
            if (!category) throw new Error('Category not found');
            return category;
        } catch (error) {
            throw new Error('Error fetching category: ' + error.message);
        }
    };

    // Update a category by ID
    updateCategory = async (id, data) => {
        try {
            const category = await categoryModel.findByIdAndUpdate(id, data, { new: true });
            if (!category) throw new Error('Category not found');
            return category;
        } catch (error) {
            throw new Error('Error updating category: ' + error.message);
        }
    };

    // Delete a category by ID
    deleteCategory = async (id) => {
        try {
            const category = await categoryModel.findByIdAndDelete(id);
            if (!category) throw new Error('Category not found');
            return category;
        } catch (error) {
            throw new Error('Error deleting category: ' + error.message);
        }
    };

}



module.exports = new CategoryRepository();