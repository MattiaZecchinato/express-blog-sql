// require express module
const express = require('express');
const router = express.Router();

// controllers
const controllers = require('../controllers/postsController.js');

// index
router.get('/', controllers.index);

// show
router.get('/:id', controllers.show);

// store
router.post('/', controllers.store);

// update
router.put('/:id', controllers.update);

// modify
router.patch('/:id', controllers.modify);

// delete
router.delete('/:id', controllers.destroy);

// export all routers
module.exports = router;