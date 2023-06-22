const { Category } = require('../models/category');
const { createSlug } = require('../utils/createSlug');
const { BadRequest, Conflict, NotFound } = require('../utils/appError');

module.exports.createCategory = async (req, res, next) => {
    try {
        const categoryName = req.body.category_name
        let image;

        if (req.image) {
            image = req.image
        } else {
            image = null
        }

        if (!categoryName) {
            throw new BadRequest('You must provide a name');
        }

        const slug = createSlug(categoryName);
        const newCategory = new Category({
            categoryName: categoryName,
            slug: slug,
            image: image
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Category created'
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new Conflict('Duplicate category name'))
        } else {
            next(error)
        }
    }
};

module.exports.listCategory = async (req, res, next) => {
    try {
        const categories = await Category
            .find()
            .select('-__v');

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error)
    }
};

module.exports.updateCategory = async (req, res, next) => {
    try {
        const categoryName = req.body.category_name;
        let is_active = req.body.is_active;
        const categoryId = req.params.id;
        const validCategory = await Category.findOne({ _id: categoryId });
        let image;
        let slug;

        if (!validCategory) {
            throw new NotFound('Category not found')
        }

        if (req.image) {
            image = req.image
        }

        if (categoryName) {
            slug = createSlug(categoryName);
        }

        if (is_active && is_active === 'true') {
            is_active = true;
        } else if (is_active && is_active === 'false') {
            is_active = false
        } else if (is_active && is_active !== 'true' && is_active !== 'false') {
            throw new BadRequest('is_active must be true or false')
        } else {
            is_active = validCategory.is_active;
        }
        
        validCategory.categoryName = categoryName ? categoryName : validCategory.categoryName;
        validCategory.slug = slug ? slug : validCategory.slug;
        validCategory.image = image ? image : validCategory.image;
        validCategory.is_active = is_active;

        await validCategory.save();

        res.status(201).json({
            success: true,
            message: 'Category updated'
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new Conflict('Duplicate category name'))
        } else {
            next(error)
        }
    }
};

module.exports.deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const validCategory = await Category.findOne({ _id: categoryId });

        if (!validCategory) {
            throw new NotFound('Category not found')
        }
        
        validCategory.is_deleted = true;
        await validCategory.save();

        res.status(200).json({
            success: true,
            message: 'Category deleted'
        })
    } catch (error) {
        next(error);
    }
};