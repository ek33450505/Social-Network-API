const router = require('express').Router();
const apiRoutes = require('./api');

const userRoutes = require('./apiRoutes/userRoutes');

router.use('/api/users', userRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;