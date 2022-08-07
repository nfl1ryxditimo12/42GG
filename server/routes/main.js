const express = require("express");
const axios = require("axios");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Cadet = require("../models/cadet");

const loginRequire = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) res.redirect("/login");
    else {
        const username = jwt.verify(token, process.env.JWT_SECRET);
        await Cadet.findOne({ where: { login: username.login } })
            .then((value) => {
                if (value.dataValues.login === username.login) next();
                else res.redirect("/error/404");
            })
            .catch(() => res.redirect("/error/500"));
    }
};

router.get("/", loginRequire, (req, res) => {
    res.send("hihi");
    console.log(jwt.verify(req.cookies.token, process.env.JWT_SECRET));
});

module.exports = router;
