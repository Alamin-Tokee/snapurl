
// const router = express.Router()

function authRequired(req, res, next) {
  if (!req.session.user_id) {
    // return res.status(401).send("Unauthorized – user not found in session");
    return res.redirect("/login");
  }
  next();
}

module.exports = authRequired;
