const { nanoid } = require("nanoid");
const prisma = require("../connect");
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;



async function handleLogin(req, res) {
  //const { userId, password } = req.body;

  try {

    const user_id = req.body.userId;
    const password = encodeURIComponent(req.body.password);

    const url = `http://192.168.200.200:8281/auth/CheckUser/index?userId=${user_id}&userPass=${password}&sysName=global_report`;

    const response = await axios.get(url);
    const data = response.data;

    // console.log(data.auth);

    if (data.auth == true) {
      req.session.user_id = user_id;
      req.session.user_name = data.name;

      return res.redirect("/home");  // SUCCESS
    }else{
      return res.render("login", { error: "HRMS Server Error" });
    }
    
  } catch (err) {
    return res.render("login", { error: "HRMS Server Error" });
  }
};



async function handleGenerateNewShortUrl(req, res) {
  const { url, customId } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });

  if (customId && customId.trim() !== "") {
    const existingCustom = await prisma.url.findUnique({ where: { shortId: customId } });
    if (existingCustom) {
      return res.render("home", {
        error: "Custom short ID is already taken",
        baseURL,
      });
    }
    const existingURL = await prisma.url.findFirst({ where: { redirectURL: url } });
    if (existingURL) {
      return res.render("home", {
        id: existingURL.shortId,
        baseURL,
      });
    }

    const customURL = await prisma.url.create({
      data: {
        shortId: customId,
        redirectURL: url,
        creatorId: req.session.user_id,
        creatorName: req.session.user_name,
      },
    });

    return res.render("home", {
      id: customURL.shortId,
      baseURL,
    });
  }

  const shortId = nanoid(8);

  const existingURL = await prisma.url.findFirst({ where: { redirectURL: url } });

  if (existingURL) {
    return res.render("home", {
      id: existingURL.shortId,
      baseURL,
    });
  }
  await prisma.url.create({
    data: {
      shortId: shortId,
      redirectURL: url,
      creatorId: req.session.user_id,
      creatorName: req.session.user_name,
    },
  });

  const user_id = req.session.user_id;
  const user_name = req.session.user_name;

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const totalUrls = await prisma.url.count({ where: { creatorId: user_id } });
  const urls = await prisma.url.findMany({ where: { creatorId: user_id }, skip, take: limit, orderBy: {id: 'desc' }, include: { visits: true }});

  

  // console.log(user);

  return res.render("home", {
    user_id: user_id,
    user_name: user_name,
    id: shortId,
    baseURL,
    urls,
    currentPage: page,
    totalPages: Math.ceil(totalUrls / limit),
  });
}

// async function handleGetAnalytics(req, res) {
//   const shortId = req.params.shortId;
//   const result = await prisma.url.findUnique({
//     where: { shortId },
//     include: { visits: true },
//   });
//   return res.render("analytics", {
//     shortId: result.shortId,
//     redirectURL: result.redirectURL,
//     totalClicks: result.visits.length,
//     analytics: result.visits,
//     baseURL: process.env.BASE_URL || "http://localhost:3000",
//   });
// }


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await prisma.url.findUnique({
    where: { shortId },
    include: { visits: true }, // include visits
  });

  if (!result) {
    return res.status(404).send("URL not found");
  }

  // Convert BigInt to Number for safe JSON serialization
  const normalizedVisits = result.visits.map(v => ({
    ...v,
    timestamp: Number(v.timestamp), // BigInt -> Number
  }));

  return res.render("analytics", {
    shortId: result.shortId,
    redirectURL: result.redirectURL,
    totalClicks: normalizedVisits.length,
    analytics: normalizedVisits,
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  });
}


async function renderHome(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const user_id = req.session.user_id;
    const user_name = req.session.user_name;


    const totalUrls = await prisma.url.count({ where: { creatorId: user_id } });
    const urls = await prisma.url.findMany({ where: { creatorId: user_id }, include: { visits: true }, skip, take: limit, orderBy: {id: 'desc' }});

  
    res.render("home", {
      user_id: user_id,
      user_name: user_name,
      urls,
      baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
      currentPage: page,
      totalPages: Math.ceil(totalUrls / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}



async function redirectUrlFromShortid(req, res) {
 const shortId = req.params.shortId;
  const url = await prisma.url.findUnique({
    where: {
      shortId: shortId,
    },
  });

  if (!url) {
    return res.status(404).send("Short URL not found");
  }

  await prisma.visitHistory.create({
    data: {
      timestamp: Date.now(),
      urlId: url.id,
    },
  });

  res.redirect(url.redirectURL);
}

module.exports = {
  handleLogin,
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  renderHome,
  redirectUrlFromShortid
};
