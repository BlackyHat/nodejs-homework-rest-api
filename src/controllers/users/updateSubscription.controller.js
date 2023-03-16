const asyncHandler = require("express-async-handler");
const { updatedSubscription } = require("../../services");

const updateSubscriptionController = asyncHandler(async (req, res) => {
  const {
    user: { _id: id, email },
    body: { subscription },
  } = req;

  await updatedSubscription(id, subscription);
  res.status(200).json({ message: "Success.", user: { email, subscription } });
});

module.exports = updateSubscriptionController;
