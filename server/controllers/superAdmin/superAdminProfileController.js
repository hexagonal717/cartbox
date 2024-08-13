const superAdminSchema = require('../../model/superAdminSchema');
const argon = require('argon2');

const getSuperAdminInfoByParams = async (req, res) => {
  try {
    const data = await superAdminSchema.findById(req.params.id);
    const { password, ...other } = data._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const putSuperAdminInfoByParams = async (req, res) => {
  try {
    const updateData = await superAdminSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );

    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
  }
};

const deleteSuperAdminInfoByParams = async (req, res) => {
  try {
    await superAdminSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ type: 'success' });
  } catch (err) {
    console.log(err);
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
  getSuperAdminInfoByParams,
  putSuperAdminInfoByParams,
  deleteSuperAdminInfoByParams,
  /*insertAllData,
    deleteAllData,
    filterData,*/
};
