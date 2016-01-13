'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter

module.exports = function(Products, app, auth) {

    //app.use(bodyParser.json()); // support json encoded bodies
    //app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.get('/api/products/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/products/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/products/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/products/example/render', function(req, res, next) {
    Products.render('index', {
      package: 'products'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

    var products = require('../controllers/products')(Products);
    //get all product
    app.route('/api/getProducts').get(products.getProducts);

    //get product by id

    //app.post('/api/getProductById', function(req, res) {
    //    var _id = req.body.id;
    //    var name = req.body.name;
    //    var price = req.body.price;
    //    console.log(name);
    //    res.send(_id+'   '+name+'    '+price);
    //    //Product.find(function(err, products){
    //    //    if (err) return res.status(500).json({
    //    //        error: 'Can\'t list the products'
    //    //    });
    //    //    res.send ({
    //    //        model:products
    //    //    });
    //    //});
    //});
    app.route('/api/getProductById').post(products.getProductById);
    app.route('/api/createProduct').post(products.createProduct);
    app.route('/api/updateProduct').post(products.updateProduct);
    app.route('/api/destroyProduct').post(products.destroyProduct);

};
