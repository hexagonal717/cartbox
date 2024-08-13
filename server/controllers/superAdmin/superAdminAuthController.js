const superAdminSchema = require('../../model/superAdminSchema');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { firstName, lastName, age, email, phone, password } = req.body;

    if (!firstName || !lastName || !age || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required.(admin)' });
    }

    const existingUserEmail = await superAdminSchema.findOne(
      { email },
      {},
      { lean: true },
    );
    const existingUserPhone = await superAdminSchema.findOne(
      { phone },
      {},
      { lean: true },
    );
    if (existingUserEmail || existingUserPhone) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = new superAdminSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      password: await argon.hash(req.body.password),
    });
    await newUser.save();
    res.status(200).json('success');
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

    const dbExistingUser = await superAdminSchema.findOne(
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
