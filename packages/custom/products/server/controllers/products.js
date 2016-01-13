'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Products) {
    return{
        /**
         * List of Products
         */
        getProducts: function(req, res) {
            Product.find(function(err, products){
                if (err) return res.status(200).json({
                    status: false,
                    mess: 'Can\'t list the products',
                    data: {},
                    err: err
                });
                res.status(200).json ({
                    status: true,
                    mess: 'successfull',
                    data:products,
                    err: {}
                });
            });
        },

        /**
         * get Product by Id
         */

        getProductById: function(req, res) {

            //product.provider = 'local';

            // because we set our product.provider to local our models/product.js validation will always be true
            req.assert('id', 'You must enter a name').notEmpty();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data: {},
                    err: errors
                });
            }
            var _id = req.body.id;
            //console.log(_id);
            Product.findOne({
                _id: _id
            }).exec(function(err, productbyid) {
                res.status(200).json ({
                    status: true,
                    mess: 'successfull',
                    data: productbyid,
                    err:{}
                });
            });
            //res.send('oke');
        },

        /**
         * Create product
         */
        createProduct: function(req, res) {

            var product = new Product(req.body);

            //product.provider = 'local';

            // because we set our user.provider to local our models/product.js validation will always be true
            req.assert('name', 'You must enter a name').notEmpty();
            req.assert('brand', 'You must enter a brand of product').notEmpty();
            req.assert('price', 'You must enter a price is a number').isInt();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data: {},
                    err: errors
                });
            }
             //res.send(product.name);
            product.save(function(err) {
                if (err) {
                    var modelErrors = [];

                    if (err.errors) {

                        for (var x in err.errors) {
                            modelErrors.push({
                                param: x,
                                msg: err.errors[x].message,
                                value: err.errors[x].value
                            });
                        }

                        res.status(200).json({
                            status: false,
                            mess: 'Some thing wrong',
                            data:{},
                            err: modelErrors
                        });
                    }
                };

                var data =[{
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    created: Date.now()
                }];

                Products.events.publish({
                        action: 'created',
                        product: data
                    });
                //console.log(data);
                res.status(200).json({
                    status: true,
                    mess: 'successfull',
                    data: data,
                    err:{}
                });
            });
        },

        /**
         * Update product
         * */
        updateProduct: function(req,res){
            var product = req.body;
            req.assert('id', 'You must enter a id').notEmpty();
            req.assert('name', 'You must enter a name').notEmpty();
            req.assert('brand', 'You must enter a brand of product').notEmpty();
            req.assert('price', 'You must enter a price is a number').isInt();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data: {},
                    err: errors
                });
            }

            Product.findOneAndUpdate({ _id: req.body.id }, {
                name: product.name,
                brand: product.brand,
                price: product.price,
                updated: Date.now()
            }, { multi: true }, function (err) {
                if (err) return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data:{},
                    err: err
                });
                else res.status(200).json({
                    status: true,
                    mess: 'successfull',
                    data:{
                        _id: product.id,
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        updated: Date.now()
                        },
                    err:{}
                });
                //console.log('The raw response from Mongo was ', raw);
            });
        },

        /**
         * Destroy product
         * */
        destroyProduct: function (req,res) {
            var product = req.body;
            req.assert('id', 'You must enter a id').notEmpty();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data: {},
                    err: errors
                });
            }
            Product.findOneAndRemove({ _id: product.id }, function (err) {
                if (err) return res.status(200).json({
                    status: false,
                    mess: 'Some thing wrong',
                    data: {},
                    err: err
                });
                else res.status(200).json({
                    status: true,
                    mess: 'successfull',
                    data: {},
                    err: {}
                })
            });
        }

      }
}