const router = require('express').Router();
const thoughRoutes = require('./thoughtRoutes');
const userRoutes = require('./user-routes');


// add prefix of `/users` to routes created in `user-routes.js`
router.use('/thoughts', thoughRoutes);
router.use('/users', userRoutes);

module.exports = router;