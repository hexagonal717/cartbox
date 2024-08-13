const router = require('express').Router();
const {
  verifyToken,
} = require('../../../middleware/customer/customerAuthMiddleware');
const {
  getUser,
  putUser,
  deleteUser,
  insertAllData,
  deleteAllData,
  filterData,
  findAllUsers,
  findUserByAge,
  addAddress,
  putAddress,
  deleteAddress,
  getAddress,
} = require('../../../controllers/customer/customerProfileController');

router.get('/get-user/:id', verifyToken, getUser);

router.put('/put-user/:id', verifyToken, putUser);

router.delete('/delete-user/:id', verifyToken, deleteUser);

router.get('/get-address/:id', getAddress);

router.post('/add-address/:id', addAddress);

router.put('/put-address/:id/:addressId', putAddress);

router.delete('/delete-address/:id/:addressId', deleteAddress);

router.post('/insertAllData', insertAllData);

router.delete('/deleteAllData', deleteAllData);
router.get('/filterData', filterData);
router.get('/mongoQuery/findAllUsers', findAllUsers);
router.get('/mongoQuery/findUserByAge', findUserByAge);
module.exports = router;
