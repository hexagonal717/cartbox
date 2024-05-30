const router = require("express").Router();
const userInfo = require("../Model/userSchema");

router.get("/getAllUserInfo", async (req, res) => {
  try {
    const data = await userInfo.find();

    if (data.length === 0) {
      res.status(400).json({ error: "User list is empty." });
    }

    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

/*
router.get("/getUserInfoById", async (req, res) => {
  try {
    const data = await userInfo.findById(req.body._id);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
*/

router.get("/getUserInfoByParams/:id", async (req, res) => {
  try {
    const data = await userInfo.findById(req.params.id);

    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

router.get("/getUserInfoByQuery", async (req, res) => {
  try {
    console.log(req.query);
    const data = await userInfo.findOne(
      { _id: req.query.id },
      {},
      { lean: true },
    );

    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

router.put("/updateUserInfo/:id", async (req, res) => {
  try {
    const updateData = await userInfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );

    console.log(updateData);
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteUserInfo/:id", async (req, res) => {
  try {
    await userInfo.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully.");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
