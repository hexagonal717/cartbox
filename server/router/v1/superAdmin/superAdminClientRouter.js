const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/superAdmin/superAdminAuthMiddleware');
const {
  getClientList,
  getClient,
  addClient,
  putClient,
  deleteClient,
} = require('../../../controllers/superAdmin/superAdminClientController');

router.post('/add-client/:id', addClient);
router.get('/get-client-list', getClientList);
router.get('/get-client', getClient);
router.put('/put-client/:id', putClient);
router.delete('/delete-client/:id', deleteClient);

module.exports = router;
