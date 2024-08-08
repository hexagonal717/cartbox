const AdminInfoSchema = require('../../model/adminSchema').AdminInfoSchema;
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    console.log(req.body, 'admin third check');

    const { firstName, lastName, age, email, phone, password } = req.body;

    if (!firstName || !lastName || !age || !email || !phone || !password) {
      console.log('All fields are required.(admin)');

      return res.status(400).json({ error: 'All fields are required.(admin)' });
    }

    const existingUserEmail = await AdminInfoSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    const existingUserPhone = await AdminInfoSchema.findOne(
      { phone },
      {},
      { lean: true },
    );
    if (existingUserEmail || existingUserPhone) {
      console.log('User already exists.');
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = new AdminInfoSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      password: await argon.hash(req.body.password),
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

    const dbExistingUser = await AdminInfoSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    console.log(dbExistingUser);
    if (!dbExistingUser) {
      return res.status(401).json({ error: 'Email or Password is incorrect.' });
    }

    const isPasswordValid = await argon.verify(dbExistingUser.password, password);

    !isPasswordValid && res.status(401).json('not matched');
    if (dbExistingUser && isPasswordValid) {
      console.log('Login Successful.');
      const sessionToken = jwt.sign(
        {
          id: dbExistingUser._id,
        },
        process.env.JWT_ADMIN_SECRET_KEY,
      );

      return res.status(200).json({
        success: true,
        userId: dbExistingUser._id,
        tokenId: sessionToken,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
  signup,
  login,
};
