const argon = require('argon2');
const SuperAdmin = require('../../model/superAdminSchema');
const multer = require('multer');
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

const getUser = async (req, res) => {
  try {
    const data = await SuperAdmin.find({ _id: req.params.id }, {}, { lean: true });
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
    const existingUser = await SuperAdmin.findById(req.params.id);

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
    const updateData = await SuperAdmin.findByIdAndUpdate(
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
/*const insertAllData = async (req, res) => {
  try {
    // Hash the passwords for each user
    const usersWithHashedPasswords = await Promise.all(
      req.body.map(async (user) => {
        const hashedPassword = await argon.hash(user.password);
        return { ...user, password: hashedPassword };
      }),
    );

    // Insert users into the database
    const result = await userInfo.insertMany(usersWithHashedPasswords);

    res.status(200).json({ type: "success", payload: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: "error",
      message: "Failed to insert data",
      error: err.message,
    });
  }
};

const deleteAllData = async (req, res) => {
  try {
    await userInfo.deleteMany();
    res.status(200).json({ type: "delete success" });
  } catch (err) {
    console.log(err);
  }
};
const filterData = async (req, res) => {
  try {
    const filData = await userInfo.find({ age: { $gte: 25 } });
    res.status(200).json({ type: "success", data: filData });
  } catch (err) {
    console.log(err);
  }
};*/

module.exports = {
  getUser,
  putUser: [upload.single('image'), putUser],
  /*insertAllData,
    deleteAllData,
    filterData,*/
};
