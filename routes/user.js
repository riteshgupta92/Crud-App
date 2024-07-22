const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../model/user");

// Created Users
router.post("/user", (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser
      .save()
      .then((user) => {
        console.log(user);
        res.status(201).json({ message: "User Created Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(401)
          .json({ message: "Server Has Failed To Create New User" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed To Create New User" });
  }
});

// Get All Users
// router.get("/user", (req,res)=>{
//     try{
//         User.find()
//         .then((user)=>{
//             console.log(user)
//             res.status(200).json(user)
//         })
//         .catch((err)=>{
//             console.log(err)
//             res.status(404).json({message : "Users Not Found"})
//         })
//     }catch(err){
//         console.log(err)
//         res.status(500).json({message : "Internal Server Error"})
//     }
// })

// Pagination:-

router.get("/user", async (req, res) => {
  try {
    const limit = req.query["limit"];
    const offset = req.query["offset"];
    const user = await User.find().limit(limit).skip(offset).exec();
    const count = await User.countDocuments();
    console.log(user)
    console.log(count)
    res.status(200).json({
      user,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Uable To Find Users" });
  }
});

module.exports = router;
