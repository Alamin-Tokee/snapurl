const express = require('express');
const prisma = require("../connect");
const router = express.Router(); // to handle modular routes.
const { redirectUrlFromShortid } = require("../controllers/url");

router.get('/:shortId', redirectUrlFromShortid);
router.get("/", (req, res) => {

    if (req.session.user_id) {
        return res.redirect("/home"); // redirect to home if user is logged in
    }
    res.redirect("/login");
});

module.exports = router;
