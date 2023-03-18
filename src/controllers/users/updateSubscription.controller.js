const asyncHandler = require("express-async-handler");
const { updatedProfile } = require("../../services");

const updateSubscriptionController = asyncHandler(async (req, res) => {
  const {
    user: { _id: id, email },
    body: { subscription },
  } = req;

  await updatedProfile(id, subscription);
  res.status(200).json({ message: "Success.", user: { email, subscription } });
});

module.exports = updateSubscriptionController;
