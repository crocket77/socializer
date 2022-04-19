const router = require('express').Router();
const pizzaRoutes = require('./user-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/users', userRoutes);

module.exports = router;