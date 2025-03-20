const Session = require("../models/sessions.model.js");
<<<<<<< HEAD
const { sessionValidation } = require("../validations/sessions.validation.js");
=======
const { sessionsValidation } = require("../validations/sessions.validation.js");
>>>>>>> f964b36679dd47467571817c97f574e6795d8df6

const createSession = async (req, res) => {
  try {
    const { error, value } = sessionsValidation(req.body);
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
