const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/Users");

//READ
// {
//     "_id": "5dfb6a3......f65cb0fd6",
//     "token": "SJEgX7rtjG1......B8VOR4RK11WNJrDmBWPrWp"
// }
router.post("/login", async (req, res) => {
  if (!req.fields.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  try {
    const isUserExist = await User.findOne({ username: req.fields.username });
    if (!isUserExist) {
      return res.status(400).json({ error: "utilisateur non trouvé" });
    }
    const hash = SHA256(req.fields.password + isUserExist.salt).toString(
      encBase64
    );
    if (hash === isUserExist.hash) {
      return res.status(200).json({
        _id: isUserExist._id,
        token: isUserExist.token
      });
    } else {
      return res.status(400).json({ error: "invalid password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});
//CREATE
// {
//     "_id": "5dfb659d7......4940f98b",
//     "token": "pPTH7ORMSyQRVTzV3UJ2s.....vuV9EZqAaechHmZX0ekTud1slhUoyy",
//     "account": "L......r"
// }
router.post("/signup", async (req, res) => {
  if (!req.fields.username) {
    return res.status(400).json({ message: " username est manquant" });
  }
  if (!req.fields.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  try {
    const isUserExist = await User.findOne({ email: req.fields.username });
    if (isUserExist) {
      return res.status(400).json({ error: " utilisateur déjà existant " });
    }

    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(req.fields.password + salt).toString(encBase64);
    const user = new User({
      username: req.fields.username,
      token,
      salt,
      hash
    });
    user.save(err => {
      if (err) {
        return next(err.message);
      } else {
        return res.json({
          _id: user._id,
          token: user.token,
          account: user.username
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
