const Session = require("../models/session.model.js");
const { sessionValidation } = require("../validations/session.validation.js");

const createSession = async (req, res) => {
  try {
    const { error, value } = sessionValidation(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newSession = await Session.create(value);
    res.status(200).send({ data: newSession });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ data: session });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    await session.destroy();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createSession, getUserSession, deleteUserSession };
