const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.send("Logout error");
    }
    res.redirect("/login");
  });
});
module.exports = router;