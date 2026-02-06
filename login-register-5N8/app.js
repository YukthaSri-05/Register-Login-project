
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/loginDB");

app.use("/", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
