const Session = require("../models/sessions.model.js");

const getUserSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    if (!session) {
      return res.status(404).send("Session not found!");
    }
    res.send(session);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUserSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    if (!session) {
      return res.status(404).send("Session not found!");
    }
    await session.destroy();
    res.send("Session deleted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getUserSession, deleteUserSession };
