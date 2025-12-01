require('dotenv').config();
const express = require("express");
const path = require("path");
const prisma = require("./connect");
const urlRouter = require("./routes/url");
const staticRouter = require('./routes/staticRouter');

const app = express();
const PORT = process.env.PORT || 3333;

const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`; 

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/test", async(req, res) => {
//   const allUrls = await prisma.url.findMany({});
//   return res.render("home", {
//     urls: allUrls,
//     baseURL,
//   });
// });

app.use("/url", urlRouter);

app.use("/", staticRouter);

// app.get("/:shortId", redirectUrlFromShortid);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
