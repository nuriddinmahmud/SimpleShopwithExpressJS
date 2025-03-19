const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const accessKey = process.env.ACCESS_KEY || "accessKey";

function verifyToken(req, res, next) {
  try {
    let header = req.header("Authorization").split(" ");
    let [_, token] = header;

    if (!token) {
      return res.status(401).send({ message: "Token not found ❗" });
    }

    let accessSecret = accessKey;
    let data = jwt.decode(token, accessSecret);
    req.user = data;

    next();
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

module.exports = verifyToken;
