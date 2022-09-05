import express from "express";
import User from "../models/User.js";
const userRoute = express.Router();

// update profile
userRoute.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },

        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account !");
  }
});
////to use bcrypt tp hash the password we need to use this:

// userRoute.put("/:id", async(req, res) => {
//     if(req.body.userId === req.params.id) {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             // const hashedPass = await bcrypt.hash(req.body.password, salt)
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         }
//         try {
//             const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//                 $set:req.body
//             }, {new:true});
//             res.status(200).json(updatedUser)

//         } catch (error) {
//             res.status(500).json(error)

//         }

//     }else {
//         res.status(401).json("You can update only your account !")
//     }
// })

// Delete profile
userRoute.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    // res.status(200).json(deleteUser, "user deleted")
    res.status(200).json({
      deleteUser,
      message: "user has been deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user
userRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default userRoute;
