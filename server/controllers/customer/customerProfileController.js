const customerSchema = require('../../model/customerSchema');
const cartSchema = require('../../model/cartSchema');
const orderSchema = require('../../model/orderSchema');
const paymentSchema = require('../../model/paymentSchema');
const argon = require('argon2');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const getUser = async (req, res) => {
  try {
    const data = await customerSchema.find(
      { _id: req.params.id },
      {},
      { lean: true },
    );
    const { password, ...other } = data[0];

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const putUser = async (req, res) => {
  try {
    let imagePath = null;

    // Fetch the user from the database to get the type and ObjectId
    const existingUser = await customerSchema.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      // Construct the folder path based on user type and ObjectId
      const uploadPath = `cartbox/${existingUser.role}/${existingUser._id}/profile`;

      // Upload the image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: uploadPath, // Specify folder path
        public_id: req.file.originalname.split('.')[0], // Filename without extension
        overwrite: true,
      });

      // Set the imagePath to the Cloudinary secure URL
      imagePath = uploadedImage.secure_url;
    }

    // Prepare the fields to be updated
    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      ...req.body,
    };

    if (imagePath) {
      updateFields.image = imagePath;
    }

    // Update the user in the database
    const updateData = await customerSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true },
    );

    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await customerSchema.findByIdAndDelete(req.params.id);
    await cartSchema.findOneAndDelete({ customerId: req.params.id });
    await orderSchema.findOneAndDelete({ customerId: req.params.id });
    await paymentSchema.findOneAndDelete({ customerId: req.params.id });
    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
  }
};

const insertAllData = async (req, res) => {
  try {
    // Hash the passwords for each user
    const usersWithHashedPasswords = await Promise.all(
      req.body.map(async (user) => {
        const hashedPassword = await argon.hash(user.password);
        return { ...user, password: hashedPassword };
      }),
    );

    // Insert users into the database
    const result = await customerSchema.insertMany(usersWithHashedPasswords);

    res.status(200).json({ status: 'success', payload: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to insert data',
      error: err.message,
    });
  }
};

const deleteAllData = async (req, res) => {
  try {
    await customerSchema.deleteMany();
    res.status(200).json({ type: 'delete success' });
  } catch (err) {
    console.log(err);
  }
};

const filterData = async (req, res) => {
  try {
    const filData = await customerSchema.find({ age: { $gte: 25 } });
    res.status(200).json({ type: 'success', data: filData });
  } catch (err) {
    console.log(err);
  }
};

//Mongo Queries
const findAllUsers = async (req, res) => {
  try {
    const data = await customerSchema.find();
    res.send(data);
  } catch (err) {}
};

const findUserByAge = async (req, res) => {
  try {
    const data = await customerSchema.find({ age: 25 });
    res.send(data);
  } catch (err) {}
};

const getAddress = async (req, res) => {
  const { id: customerId } = req.params;
  console.log(customerId);

  try {
    const customer = await customerSchema.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    console.log(customer);

    res.status(200).json({ payload: customer.address });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving addresses', error });
  }
};

const addAddress = async (req, res) => {
  const newAddress = req.body;

  try {
    const customer = await customerSchema.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (newAddress.isDefault) {
      // If the new address is default, set all other addresses to non-default
      customer.address.forEach((address) => (address.isDefault = false));
    }

    customer.address.push(newAddress);

    const addressInfo = customer.address;

    await customer.save();
    res.status(200).json({
      status: 'success',
      message: 'Address added successfully',
      payload: addressInfo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
};

const putAddress = async (req, res) => {
  const { id: customerId, addressId } = req.params;
  const updatedAddress  = req.body;

  try {
    const customer = await customerSchema.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const address = customer.address.id(addressId);
    if (!address) {
      return res
        .status(404)
        .json({ status: 'success', message: 'Address not found' });
    }

    if (updatedAddress.isDefault) {
      // If the updated address is default, set all other addresses to non-default
      customer.address.forEach((addr) => (addr.isDefault = false));
    }

    Object.assign(address, updatedAddress);
    await customer.save();
    res.status(200).json({ status: 'success',message: 'Address updated successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};

const deleteAddress = async (req, res) => {
  const { id: customerId, addressId } = req.params;

  console.log('Customer ID:', customerId);
  console.log('Address ID:', addressId);

  try {
    const customer = await customerSchema.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const addressIndex = customer.address.findIndex(addr => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const wasDefault = customer.address[addressIndex].isDefault;

    customer.address.splice(addressIndex, 1); // Remove the address from the array

    // If the deleted address was the default and there are other addresses left, set a new default
    if (wasDefault && customer.address.length > 0) {
      customer.address[0].isDefault = true; // Set the first address as the new default
    }

    await customer.save();  // Save the document after removing the address

    res.status(200).json({ status: 'success', message: 'Address removed successfully' });
  } catch (error) {
    console.error('Error removing address:', error);  // Log the full error
    res.status(500).json({ message: 'Error removing address', error });
  }
};



module.exports = {
  getUser,
  putUser: [upload.single('image'), putUser],
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
};
