const customerSchema = require('../../model/customerSchema');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const nodemailer = require('nodemailer');
const otpSchema = require('../../model/otpSchema');
const Cart = require('../../model/cartSchema');

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

const signup = async (req, res) => {
  try {
    const { firstName, lastName, age, email, phone, address, password, role } =
      req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUserEmail = await customerSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    /*const existingUserPhone = await customerSchema.findOne(
      { phone },
      {},
      { lean: true },
    );*/

    if (existingUserEmail /*|| existingUserPhone*/) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    let imagePath = null;

    // Create the new user document before uploading the image
    const newUser = new customerSchema({
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
      const savedCustomer = await newUser.save();

      // Upload the image to Cloudinary with folder path
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: `cartbox/${role}/${savedCustomer._id}/profile`, // Specify folder path
        public_id: req.file.originalname.split('.')[0], // Filename without extension
        overwrite: true,
      });

      // Update the user document with the image path
      imagePath = uploadedImage.secure_url;
      savedCustomer.image = imagePath;
      await savedCustomer.save();

      // Create a new cart for the customer
      const newCart = new Cart({
        customerId: savedCustomer._id,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
      await newCart.save();

      res.status(200).json({ message: 'success' });
    } else {
      // If there's no image, just save the user and create the cart
      const savedCustomerWithoutImage = await newUser.save();
      const newCart = new Cart({
        customerId: savedCustomerWithoutImage._id,
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
      await newCart.save();

      res.status(200).json({ status: 'success' });
    }
  } catch (err) {
    console.error('Error during user signup:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and Password is required.' });
    }

    const dbExistingUser = await customerSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    if (!dbExistingUser) {
      return res.status(401).json({ error: 'Email or Password is incorrect.' });
    }

    const isPasswordValid = await argon.verify(dbExistingUser.password, password);

    !isPasswordValid && res.status(401).json('not matched');
    if (dbExistingUser && isPasswordValid) {
      const sessionToken = jwt.sign(
        {
          id: dbExistingUser._id,
        },
        process.env.JWT_CUSTOMER_SECRET_KEY,
      );

      return res.status(200).json({
        status: 'success',
        customerId: dbExistingUser._id,
        tokenId: sessionToken,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

  try {
    const existingUserEmail = await customerSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    if (!existingUserEmail) {
      return res.status(400).json({ error: "This email address doesn't exist." });
    }

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const otpData = {
      email,
      otp,
      otpExpiration,
    };

    await otpSchema.findOneAndUpdate({ email }, otpData, {
      upsert: true,
      new: true,
    });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_APP_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.NODEMAILER_APP_EMAIL,
      to: email,
      subject: 'E-Commerce OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send OTP, please try again' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const existingOtp =
      (await otpSchema.findOne({ otp }, {}, { lean: true })) &&
      (await otpSchema.deleteOne({ otp }, {}));
    if (existingOtp) {
      res.status(200).json({ success: true });
    } else {
      res.status(201).json({ error: 'Verification code does not match.' });
    }
  } catch (e) {
    res.error(e.response, 'Verification error.');
  }
};

const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password.password;

    console.log(email, '5555');

    const existingEmail = await customerSchema.findOne(email, {}, { lean: true });

    if (existingEmail) {
    }

    if (existingEmail) {
      const updatePassword = await customerSchema.findOneAndUpdate(
        email,
        { $set: { password: await argon.hash(password) } },
        { new: true },
      );
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response);
  }
};

module.exports = {
  signup: [upload.single('image'), signup],
  login,
  forgotPassword,
  verifyOtp,
  changePassword,
};
