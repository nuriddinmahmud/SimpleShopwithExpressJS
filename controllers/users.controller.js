const Users = require("../models/users.model.js");
const Regions = require("../models/regions.model.js");
const {
  usersValidation,
  usersValidationUpdate,
} = require("../validations/users.validation.js");
const nodemailer = require("nodemailer");
const { totp } = require("otplib");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sendSms = require("../config/eskiz.js");
const Session = require("../models/sessions.model.js");

dotenv.config();
const TOTP_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

totp.options = { step: 1800, digits: 6 };

async function register(req, res) {
  try {
    const body = req.body;

    let findUser = await Users.findOne({ where: { email: body.email } });
    if (findUser) {
      return res
        .status(405)
        .send({ message: "This account already exists ❗" });
    }

    const { error, value } = usersValidation(body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    value.password = await bcrypt.hash(body.password, 10);
    const registered = await Users.create(value);

    let otp = totp.generate(`${TOTP_KEY}${body.email}`);
    await transporter.sendMail({
      to: body.email,
      subject: "One-time password",
      html: `This is an OTP to activate your account: <h1>${otp}</h1>`,
    });

    res.status(200).send({
      message:
        "Registered successfully ✅. We sent OTP to your email for activation",
      data: registered,
    });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
      return res.status(405).send({ message: "Email is incorrect ❗" });
    }

    let checkOtp = totp.verify({ token: otp, secret: `${TOTP_KEY}${email}` });
    if (!checkOtp) {
      return res.status(403).send({ message: "OTP is incorrect ❗" });
    }

    if (findUser.status === "Inactive") {
      await Users.update({ status: "Active" }, { where: { email } });
    }

    res
      .status(200)
      .send({ message: "Your account has been activated successfully" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(422).send({ message: "Invalid email or password ❗" });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(422).send({ message: "Invalid email or password ❗" });
    }

    if (user.status === "Inactive") {
      return res.status(403).send({
        message: "Account not activated, You should activate your account ❗",
      });
    }

    const sessionData = {
      userId: user.id,
      ipAddress: req.ip,
      deviceInfo: req.headers["user-agent"],
    };

    console.log("Session data:", sessionData);

    try {
      console.log("🔹 Session yaratishdan oldin:", sessionData);
      let newSession = await Session.create(sessionData);
      console.log("✅ Session yaratildi:", newSession);
    } catch (err) {
      console.error("❌ Session yaratishda xatolik:", err);
      return res
        .status(500)
        .send({ message: "Session yaratishda xatolik ❗", error: err.message });
    }

    let accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        ipAddress: req.ip,
        deviceInfo: req.headers["user-agent"],
      },
      "access_secret",
      { expiresIn: "15m" }
    );

    let refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        ipAddress: req.ip,
        deviceInfo: req.headers["user-agent"],
      },
      "refresh_secret",
      { expiresIn: "7d" }
    );

    res.status(200).send({
      message: "Logged in successfully",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error("Login xatosi:", error);
    res.status(400).send({ error_message: error.message });
  }
}

module.exports = { login };

async function accessTokenGenereate(payload) {
  try {
    let accessSecret = process.env.ACCESS_KEY || "accessKey";
    return jwt.sign(payload, accessSecret, { expiresIn: "15m" });
  } catch (error) {
    console.log(error.message);
  }
}

async function refreshTokenGenereate(payload) {
  try {
    let accessSecret = process.env.REFRESH_KEY || "refreshKey";
    return jwt.sign(payload, accessSecret, { expiresIn: "7d" });
  } catch (error) {
    console.log(error.message);
  }
}

async function promoteToAdmin(req, res) {
  try {
    const role = "Admin";
    let { id } = req.params;
    await Users.update({ role }, { where: { id } });
    res.status(200).send({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function getNewAccessToken(req, res) {
  try {
    const refreshToken = req.header("Authorization")?.split(" ")[1];

    let data = await jwt.verify(
      refreshToken,
      process.env.REFRESH_KEY || "refreshKey"
    );
    const user = await Users.findByPk(data.id);
    if (!user) {
      return res.status(404).send({ message: "User not found ❗" });
    }
    let accessToken = await accessTokenGenereate({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.status(200).send({
      message: "New access token generated successfully",
      access_token: accessToken,
    });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function sendOtpPhone(req, res) {
  try {
    const user = await Users.findOne({ where: { phone: req.body.phone } });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    const token = await sendSms(req.body.phone);
    res.status(200).send({ message: "OTP sent successfully", otp: token });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function verifyOtpPhone(req, res) {
  try {
    const user = await Users.findOne({ where: { phone: req.body.phone } });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    const match = totp.verify({
      token: req.body.otp,
      secret: req.body.phone + process.env.ESKIZ_KEY || "eskizSecret",
    });
    if (!match) {
      res.status(403).send({ message: "OTP is incorrect" });
      return;
    }
    if (user.status === "Inactive") {
      await user.update({ status: "Active" });
      res.status(200).send({ message: "Account activated successfully" });
      return;
    }
    res.status(200).send({ message: "Account activated successfully" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function findAll(req, res) {
  try {
    if (["Admin"].includes(req.userRole)) {
      let findAllUsers = await Users.findAll({
        attributes: [
          "id",
          "fullName",
          "email",
          "role",
          "avatar",
          "status",
          "createdAt",
          "updatedAt",
          "phone",
          "regionID",
        ],
        include: [
          {
            model: Regions,
            as: "Region",
            attributes: ["id", "name"],
          },
        ],
      });
      return res.status(200).send({ data: findAllUsers });
    }

    if (role.includes("SuperAdmin")) {
      return res
        .status(403)
        .send({ message: "SuperAdmin can only update users, not view all ❗" });
    }

    if (role.includes("Users")) {
      let findUser = await Users.findByPk(req.user.id, {
        attributes: [
          "id",
          "fullName",
          "yearOfBirth",
          "email",
          "role",
          "avatar",
          "status",
          "createdAt",
          "updatedAt",
          "phone",
          "regionID",
        ],
        include: [
          {
            model: Regions,
            as: "Region",
            attributes: ["id", "name"],
          },
        ],
      });
      if (!findUser) {
        return res.status(404).send({ message: "Users not found ❗" });
      }
      return res.status(200).send({ data: findUser });
    }

    res.status(403).send({ message: "Unauthorized user type ❗" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params;
    let user = await Users.findByPk(id, {
      attributes: [
        "id",
        "fullName",
        "yearOfBirth",
        "email",
        "role",
        "avatar",
        "status",
        "createdAt",
        "updatedAt",
        "phone",
        "regionID",
      ],
      include: [
        {
          model: Regions,
          as: "Region",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!user) return res.status(404).send({ message: "Users not found ❗" });
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = usersValidationUpdate(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });
    if (value.password) value.password = await bcrypt.hash(value.password, 10);

    if (!["SuperAdmin", "Admin"].includes(req.user.role)) {
      return res
        .status(403)
        .send({ message: "Only SuperAdmin can update users ❗️" });
    }
    let findUser = await Users.findByPk(id);
    if (!findUser) {
      return res.status(403).send({ message: "User not found" });
    }
    await findUser.update(req.body);
    res
      .status(200)
      .send({ message: "Users updated successfully", data: findUser });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    let findUser = await Users.findByPk(id);
    if (!findUser)
      return res.status(404).send({ message: "Users not found ❗️" });
    if (findUser.role == "Admin") {
      return res.status(403).send({ message: "Nobody can destroy admin ❗️" });
    }
    let deletedUser = await Users.destroy({
      where: { id, role: { [Op.in]: ["Users"] } },
    });
    await findUser.destroy();
    if (!deletedUser)
      return res.status(403).send({ message: "Only users can be deleted ❗️" });
  } catch (e) {
    res.status(400).send({ error_message: e.message });
  }
}

module.exports = {
  register,
  verifyOtp,
  login,
  findOne,
  findAll,
  update,
  remove,
  promoteToAdmin,
  getNewAccessToken,
  sendOtpPhone,
  verifyOtpPhone,
  refreshTokenGenereate,
};
