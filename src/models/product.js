const { Schema, model } = require('mongoose');

module.exports.Product = model(
    'Product', 
    Schema({
        productName: {
            type: String,
            required: true
        },
        productCode: {
            type: String,
            required: true,
            unique: true 
        },
        stock: {
            type: Number,
            required: true
        },
        image: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        is_active: { 
            type: Boolean, 
            default: true 
        },
        is_deleted: {
            type: Boolean, 
            default: false
        }
    },

    { timestamps: true }

    )
);