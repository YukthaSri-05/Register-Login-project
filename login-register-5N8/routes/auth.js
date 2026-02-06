
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.render("success", { username: user.username });
    } else {
        res.render("login", { error: "Invalid Credentials" });
    }
});

module.exports = router;
