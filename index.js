require('dotenv').config();
const express = require("express");
const path = require("path");
const prisma = require("./connect");
const urlRouter = require("./routes/urlRouter");
const homeRouter = require('./routes/homeRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const openRouter = require('./routes/openRouter');
const session = require("express-session");

const authRequired = require("./middlewares/authRequired");

const app = express();
const PORT = process.env.PORT || 3000;

const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`; 



app.use(session({
  secret: process.env.SESSION_SECRET || "yourSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));


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

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/home", authRequired, homeRouter);

app.use("/", openRouter);

app.use("/url", authRequired, urlRouter);

// app.get("/:shortId", redirectUrlFromShortid);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
