'use strict';
module.exports = function (app) {
    

    var baseCategory = require('../controllers/baseCategoyController');
    var thing = require('../controllers/paymentController');


    app.route('/baseCategory')
        .get(baseCategory.list_all_base_category)
        .post(baseCategory.create_a_base_category);

    app.route('/baseCategory/:id')
        .get(baseCategory.read_a_base_category)
        .put(baseCategory.update_a_base_category)
        .delete(baseCategory.delete_a_base_category);

    var category = require('../controllers/categoryController');

    app.route('/category')
        .get(category.list_all_category)
        .post(category.create_a_category);

    app.route('/category/:id')
        .get(category.read_a_category)
        .put(category.update_a_category)
        .delete(category.delete_a_category);

    var categoryRel = require('../controllers/categoryRelController');

    app.route('/categoryRel')
        .get(categoryRel.list_all_category_rel)
        .post(categoryRel.create_a_category_rel);

    app.route('/categoryRel/:id')
        .get(categoryRel.read_a_category_rel)
        .put(categoryRel.update_a_category_rel)
        .delete(categoryRel.delete_a_category_rel);

    var item =
        require('../controllers/itemController');

    app.route('/item')
        .get(item.list_all_item)
        .post(item.create_a_item);

    app.route('/item/:id')
        .get(item.read_a_item)
        .put(item.update_a_item)
        .delete(item.delete_a_item);

    var discount =
        require('../controllers/discountController');

    app.route('/discount')
        .get(discount.list_all_discount)
        .post(discount.create_a_discount);

    app.route('/discount/:id')
        .get(discount.read_a_discount)
        .put(discount.update_a_discount)
        .delete(discount.delete_a_discount);

    var contactUs =
        require('../controllers/contactUsController');

    app.route('/contactUs')
        .get(contactUs.list_all_contact_us)
        .post(contactUs.create_a_contact_us);

    app.route('/contactUs/:id')
        .get(contactUs.read_a_contact_us)
        .put(contactUs.update_a_contact_us)
        .delete(contactUs.delete_a_contact_us);

    app.route('/thing')
        .post(thing.create_a_thing);
};

