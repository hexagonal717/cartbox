const Admin = require('../../model/adminSchema');
const multer = require('multer');
const Product = require('../../model/productSchema');
const argon = require('argon2');
const cloudinary = require('cloudinary').v2;

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

const addClient = async (req, res) => {
  try {
    const { firstName, lastName, age, email, phone, address, password, role } =
      req.body;

    if (!firstName || !lastName || !age || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUserEmail = await Admin.findOne({ email }, {}, { lean: true });
    const existingUserPhone = await Admin.findOne({ phone }, {}, { lean: true });

    if (existingUserEmail || existingUserPhone) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    let imagePath = null;

    // Create the new user document before uploading the image
    const newUser = new Admin({
      firstName,
      lastName,
      email,
      phone,
      age,
      password: await argon.hash(password),
      role,
      image: imagePath,
      address,
    });

    if (req.file) {
      // Save the user to get the ObjectId
      const savedAdmin = await newUser.save();

      // Upload the image to Cloudinary with folder path
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: `cartbox/${role}/${savedAdmin._id}/profile`, // Specify folder path
        public_id: req.file.originalname.split('.')[0], // Filename without extension
        overwrite: true,
      });

      // Update the user document with the image path
      imagePath = uploadedImage.secure_url;
      savedAdmin.image = imagePath;
      await savedAdmin.save();
      res.status(200).json({ status: 'success' });
    } else {
      const savedAdminWithoutImage = await newUser.save();

      res.status(200).json({ status: 'success' });
    }
  } catch (err) {
    console.error('Error during user signup:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const getClientList = async (req, res) => {
  try {
    const admins = await Admin.find();

    // Send success response with fetched admins
    res.status(200).json({
      type: 'success',
      payload: admins,
    });
  } catch (err) {
    // Log the error details
    console.error('Error Fetching Products:', err);

    // Respond with error details
    res.status(500).json({
      type: 'error',
      message: 'Failed to fetch data',
      error: err.message,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const data = await Admin.find({ _id: req.params.id }, {}, { lean: true });
    const { password, ...other } = data[0];

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const putClient = async (req, res) => {
  try {
    let imagePath = null;

    // Fetch the user from the database to get the type and ObjectId
    const existingUser = await Admin.findById(req.params.id);

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
    const admins = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      payload: admins,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const deleteClient = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    await Product.findOneAndDelete({ adminId: req.params.id });
    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addClient,
  getClientList,
  getClient,
  deleteClient,
  putClient: [upload.single('image'), putClient],
};
