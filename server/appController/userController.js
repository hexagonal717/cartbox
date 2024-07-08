const userInfo = require("../model/userSchema");
const argon = require("argon2");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

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

const getUserInfoByParams = async (req, res) => {
  console.log("3rd check", req.body);
  try {
    const data = await userInfo.find(
      { _id: req.params.id },
      {},
      { lean: true },
    );
    console.log(data, "999999999");
    const { password, ...other } = data[0];

    res.status(200).json(other);
    console.log(data, "");
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const putUserInfoByParams = async (req, res) => {
  try {
    let imagePath = null;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      console.log(uploadedImage, "UPLOADED IMAGE");
      imagePath = uploadedImage.secure_url;
    }

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

    const updateData = await userInfo.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true },
    );

    console.log(updateData);
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const deleteUserInfoByParams = async (req, res) => {
  console.log("delete user id", req.params.id);
  try {
    await userInfo.findByIdAndDelete(req.params.id);
    res.status(200).json({ type: "success" });
  } catch (err) {
    console.log(err);
  }
};

const insertAllData = async (req, res) => {
  console.log("************", req.body);

  try {
    // Hash the passwords for each user
    const usersWithHashedPasswords = await Promise.all(
      req.body.map(async (user) => {
        const hashedPassword = await argon.hash(user.password);
        return { ...user, password: hashedPassword };
      }),
    );

    console.log("usersWithHashedPasswords", usersWithHashedPasswords);

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
};

//Mongo Queries
const findAllUsers = async (req, res) => {
  try {
    const data = await userInfo.find();
    res.send(data);
  } catch (err) {}
};

const findUserByAge = async (req, res) => {
  try {
    const data = await userInfo.find({ age: 25 });
    res.send(data);
  } catch (err) {}
};

module.exports = {
  getUserInfoByParams,
  putUserInfoByParams: [upload.single("image"), putUserInfoByParams],
  deleteUserInfoByParams,
  insertAllData,
  deleteAllData,
  filterData,
  findAllUsers,
  findUserByAge,
};
