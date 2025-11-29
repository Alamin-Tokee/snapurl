const express = require("express");
const path = require("path");
const prisma = require("./connect.js");
const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;

const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`; 

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async(req, res) => {
  const allUrls = await prisma.url.findMany({});
  return res.render("home", {
    urls: allUrls,
    baseURL,
  });
});

app.use("/url", urlRoute);

app.use("/", staticRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const url = await prisma.url.findUnique({
    where: {
      shortId: shortId,
    },
  });

  if (!url) {
    return res.status(404).send("Short URL not found");
  }

  await prisma.visit.create({
    data: {
      timestamp: Date.now(),
      urlId: url.id,
    },
  });

  res.redirect(url.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
