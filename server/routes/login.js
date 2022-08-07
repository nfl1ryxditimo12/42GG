const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//안증 페이지로 전달
router.get("/", passport.authenticate("42"));

//인증하면 인증코드를 콜백유알엘로 받음
router.get(
    "/authResult",
    passport.authenticate("42", { failureRedirect: "/login/fail" }),
    async (req, res) => {
        const ftToken = await jwt.sign(
            {
                login: req.session.passport.user.username,
            },
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                issuer: "42GG",
            }
        );
        res.cookie("token", ftToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
            httpOnly: true,
        });
        res.redirect("/");
    }
);

router.get("/fail", (req, res) => {
    console.log(req.session);
    res.render("fail");
});

module.exports = router;
