const express = require('express');
const prisma = require("../connect");
const router = express.Router(); // to handle modular routes.
const { renderHome, redirectUrlFromShortid, handleLogin } = require("../controllers/url");

router.get("/", (req, res) => {
    res.render("login", { error: null });
});

router.post("/", handleLogin);

module.exports = router;