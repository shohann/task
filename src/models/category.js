const { Schema, model } = require('mongoose');

module.exports.Category = model(
    'Category', 
    Schema({
        categoryName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true 
        },
        image: {
            type: String,
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