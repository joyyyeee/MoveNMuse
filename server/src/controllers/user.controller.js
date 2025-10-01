import { User } from "../models/user.model.js";

// Common error handler function
const handleError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({ message: "Internal Server Error" });
};

const UserViewProfileController = async (req, res) => {
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter user data before sending it in the response
    const filteredUser = filterUserData(user);
    res.status(200).json({
      message: "User profile fetched successfully",
      user: filteredUser,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const UserUpdateProfileController = async (req, res) => {
  const userId = req.user.uid;
  const updatedData = req.body;

  try {
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allowedUpdates = [
      "name",
      "age",
      "gender",
      "address",
      "phone",
    ];

    allowedUpdates.forEach((field) => {
      if (updatedData[field] !== undefined) {
        user[field] = updatedData[field];
      }
    });

    await user.save();

    // Filter user data before sending it in the response
    const filteredUser = filterUserData(user);
    res.status(200).json({
      message: "User profile updated successfully",
      user: filteredUser,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { UserViewProfileController, UserUpdateProfileController };
