'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Product Schema
 */

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images:{
        type: Array
    },
    permissions: {
        type: Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

/**
 * Validations
 */
ProductSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

ProductSchema.path('brand').validate(function(brand) {
    return !!brand;
}, 'Brand cannot be blank');
ProductSchema.path('price').validate(function(price) {
    return !!price;
}, 'Price cannot be blank');

mongoose.model('Product', ProductSchema);