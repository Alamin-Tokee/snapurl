const express = require('express');
const prisma = require("../connect.js");
const router = express.Router(); // to handle modular routes.
const { renderHome } = require("../controllers/url");

router.get("/", renderHome);

// const baseURL = process.env.BASE_URL || (process.env.PORT ? `https://snapurl.waltonbd.com/` : `http://localhost:${PORT}`);

router.get("/", async (req, res) => {
    const allurls = await prisma.url.findMany({}); // gets all urls from database
    return res.render("home", {
        urls: allurls,
        baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3333}`
    });
})

module.exports = router;
