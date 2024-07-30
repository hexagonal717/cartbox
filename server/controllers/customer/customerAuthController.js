const customerSchema = require('../../model/customerSchema');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const nodemailer = require('nodemailer');
const otpSchema = require('../../model/otpSchema');

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
    console.log(req.body, 'third check');

    const { firstName, lastName, age, email, phone, password } = req.body;

    if (!firstName || !lastName || !age || !email || !phone || !password) {
      console.log('All fields are required.');

      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUserEmail = await customerSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    const existingUserPhone = await customerSchema.findOne(
      { phone },
      {},
      { lean: true },
    );
    console.log(existingUserPhone, existingUserEmail, '***');
    if (existingUserEmail || existingUserPhone) {
      console.log('User already exists.');
      return res.status(400).json({ error: 'User already exists.' });
    }
    let imagePath = null;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      console.log(uploadedImage, 'UPLOADED IMAGE');
      imagePath = uploadedImage.secure_url;
    }

    const newUser = new customerSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      password: await argon.hash(req.body.password),
      type: req.body.type,
      image: imagePath,
    });
    console.log(newUser);
    await newUser.save();
    res.status(200).json('success');
  } catch (err) {
    console.error('Error during user signup:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    console.log('***************************', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email and Password is required.');
      res.status(400).json({ error: 'Email and Password is required.' });
    }

    const dbExistingUser = await customerSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    console.log(dbExistingUser);
    if (!dbExistingUser) {
      return res.status(401).json({ error: 'Email or Password is incorrect.' });
    }

    const isPasswordValid = await argon.verify(
      dbExistingUser.password,
      password,
    );

    !isPasswordValid && res.status(401).json('not matched');
    if (dbExistingUser && isPasswordValid) {
      console.log('Login Successful.');
      const sessionToken = jwt.sign(
        {
          id: dbExistingUser._id,
        },
        process.env.JWT_CUSTOMER_SECRET_KEY,
      );

      return res.status(200).json({
        success: true,
        customerId: dbExistingUser._id,
        tokenId: sessionToken,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
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
      return res
        .status(400)
        .json({ error: "This email address doesn't exist." });
    }

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const otpData = { email, otp, otpExpiration };

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
    console.log('Email sent: ' + mailOptions.response);

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

    console.log(password, 'password');
    console.log(email, '5555');

    const existingEmail = await customerSchema.findOne(
      email,
      {},
      { lean: true },
    );

    if (existingEmail) {
      console.log('existing email for password change');
    }

    if (existingEmail) {
      const updatePassword = await customerSchema.findOneAndUpdate(
        email,
        { $set: { password: await argon.hash(password) } },
        { new: true },
      );
      console.log(updatePassword, 'password updated successfully');
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
