const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error_message: "Invalid token format!" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "accessKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error_message: "Invalid token!" });
    }
    req.user = user;
    req.userRole = user.role;
    req.userID = user.id;
    next();
  });
};
module.exports = verifyToken;
