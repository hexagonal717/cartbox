const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/superAdmin/superAdminAuthMiddleware');

const {
  getUser,
  putUser
} = require('../../../controllers/superAdmin/superAdminProfileController');

router.get('/get-user/:id', verifyToken, getUser);
router.put('/put-user/:id', verifyToken, putUser);
module.exports = router;
