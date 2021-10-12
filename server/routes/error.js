const express = require("express");
const router = express.Router();

router.get("/404", (req, res) => res.send("404"));

router.get("/500", (req, res) => res.send("500"));

module.exports = router;
