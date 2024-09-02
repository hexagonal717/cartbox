const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/superAdmin/superAdminAuthMiddleware');

const {
  getUser,
} = require('../../../controllers/superAdmin/superAdminProfileController');

router.get('/get-user/:id', verifyToken, getUser);
module.exports = router;
