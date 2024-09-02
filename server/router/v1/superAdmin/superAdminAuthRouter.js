const router = require('express').Router();
const {
  signup,
  login,
} = require('../../../controllers/superAdmin/superAdminAuthController');

router.post('/signup', signup);

router.post('/login', login);



module.exports = router;
