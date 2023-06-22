const { Product } = require('../models/product')
const { Category } = require('../models/category')
const { BadRequest, NotFound } = require('../utils/appError')
const { generateUniqueCode } = require('../utils/generateUniqueCode')

module.exports.createProduct = async (req, res, next) => {
    try {
        let { name, stock, category } = req.body;
        let image;

        if (req.image) {
            image = req.image
        } else {
            image = null
        }

        if (!name || !stock || !category) {
            throw new BadRequest('You must provide name, stock and category');
        }

        if (stock && isNaN(stock)) {
            throw new BadRequest('Stock must be a number');
        }

        stock = Number(stock);

        if (Number(stock) < 0) {
            throw new BadRequest('Stock must be a positive number');
        }

        const validCategory = await Category
            .findOne({ _id: category, is_active: true });

        if(!validCategory) {
            throw new BadRequest('You must put a valid category')
        }

        const productCode = generateUniqueCode();

        const newProduct = new Product({
            productName: name,
            productCode: productCode,
            stock: stock,
            image: image,
            category: category
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product created'
        });
    } catch (error) {
        next(error)
    }
};

module.exports.listProduct = async (req, res, next) => {
    try {
        const products = await Product
            .find({ is_deleted: false, is_active: true })
            .select('-__v -is_active -is_deleted')

        res.status(201).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error)
    }
};

module.exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        let { name, stock, category } = req.body;
        let image;
        let validCategory;

        if (req.image) {
            image = req.image
        } else {
            image = null
        }

        if (category) {
            validCategory = await Category.findOne({ _id: category, is_active: true });
        }

        if (!validCategory) {
            throw new BadRequest('You must put a valid category');
        }

        if (stock && isNaN(stock)) {
            throw new BadRequest('Stock must be a number');
        }

        if (Number(stock) < 0) {
            throw new BadRequest('Stock must be a positive number');
        }

        const validProduct = await Product.findOne({ _id: productId });

        if (!validProduct) {
            throw new NotFound('Product not found');
        }

        validProduct.productName = name ? name: validProduct.productName;
        validProduct.image = image ? image: validProduct.image;
        validProduct.stock = stock ? stock : validProduct.stock;
        validProduct.category = category ? category : validProduct.category;

        await validProduct.save();

        res.status(200).json({
            success: true,
            message: 'Product updated'
        });
    } catch (error) {
        next(error)
    }
};

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const validProduct = await Product.findOne({ _id: productId });

        if (!validProduct) {
            throw new NotFound('Product not found');
        }

        validProduct.is_deleted = true;
        validProduct.is_active = false;

        await validProduct.save();

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        });
    } catch (error) {
        next(error)
    }
};