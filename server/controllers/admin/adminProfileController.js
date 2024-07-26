const adminSchema = require("../../model/adminSchema");
const argon = require("argon2");

const getAdminInfoByParams = async (req, res) => {
    console.log("3rd check");
    try {
        const data = await adminSchema.findById(req.params.id);
        console.log(data, "999999999");
        const {password, ...other} = data._doc;

        res.status(200).json(other);
        console.log(data, "");
    } catch (err) {
        res.status(500).json({error: "Server error. Please try again later."});
    }
};

const putAdminInfoByParams = async (req, res) => {
    try {
        const updateData = await adminSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true},
        );

        console.log(updateData);
        res.status(200).json(updateData);
    } catch (err) {
        console.log(err);
    }
};

const deleteAdminInfoByParams = async (req, res) => {
    console.log("delete user id", req.params.id);
    try {
        await adminSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({type: "success"});
    } catch (err) {
        console.log(err);
    }
};

/*const insertAllData = async (req, res) => {
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
};*/

module.exports = {
    getAdminInfoByParams,
    putAdminInfoByParams,
    deleteAdminInfoByParams,
    /*insertAllData,
    deleteAllData,
    filterData,*/
};
