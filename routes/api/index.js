const express = require('express');
const authorization = require('../../middleware/authorization');
const pkg = require('../../package.json');
const {
  WEBPACK
} = require('../../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({version: pkg.version});
});

router.use('/assets', authorization.needed('ADMIN'), require('./assets'));
router.use('/settings', authorization.needed('ADMIN'), require('./settings'));
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/account', require('./account'));
router.use('/setup', require('./setup'));

// Enable the kue app only if we aren't in webpack mode.
if (!WEBPACK) {

  // Bind the kue handler to the /kue path.
  router.use('/kue', authorization.needed('ADMIN'), require('../../services/kue').kue.app);

}

module.exports = router;
