const router = require('express').Router();
const { verifyToken } = require('../../../middleware/admin/adminAuthMiddleware');
const {
  getUser,
  putUser,
} = require('../../../controllers/admin/adminProfileController');

router.get('/get-user/:id', verifyToken, getUser);
router.put('/put-user/:id', verifyToken, putUser);

module.exports = router;
