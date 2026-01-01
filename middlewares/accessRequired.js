function accessRequired(req, res, next) {
  let ip = req.ip || req.connection.remoteAddress;

  // Handle IPv6-mapped IPv4
  if (ip.startsWith("::ffff:")) {
    ip = ip.slice(7);
  }

  // Allow localhost + LAN
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.")
  ) {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
}

module.exports = accessRequired;
