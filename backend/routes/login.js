const express = require("express");
const authenticate = require("../services/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  let authStatus = false;
  req.headers.authorization
    ? (authStatus = authenticate(req))
    : res.status(403).json({ error: "No credentials sent" });
  if (authStatus) {
    const token = jwt.sign({ user: "tate" }, "My_Secret", {
      expiresIn: 60 * 60,
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ token });
  } else {
    res.status(403).json({ error: "Wrong credentials" });
  }
});

module.exports = router;
