const express = require('express');
const prisma = require("../connect");
const router = express.Router(); // to handle modular routes.
const { renderHome, redirectUrlFromShortid } = require("../controllers/url");

router.get("/", renderHome);
router.get('/:shortId', redirectUrlFromShortid);

// const baseURL = process.env.BASE_URL || (process.env.PORT ? `https://snapurl.waltonbd.com/` : `http://localhost:${PORT}`);

router.get("/", async (req, res) => {
    const allurls = await prisma.url.findMany({}); // gets all urls from database
    return res.render("home", {
        urls: allurls,
        baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
    });
})

module.exports = router;
