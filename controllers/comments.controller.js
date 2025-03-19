const Users = require("../models/users.model.js");
const Products = require("../models/products.model.js");
const Comments = require("../models/comments.model.js");
const { Op } = require("sequelize");
const {
  commentsValidation,
  commentsValidationUpdate,
} = require("../validations/comments.validation.js");

const create = async (req, res) => {
  try {
    const { error, value } = commentsValidation(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newComments = await Comments.create(value);
    res.status(200).send({ data: newComments });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { search, page, limit, userID, productID } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }
    if (userID) {
      whereClause.userID = userID;
    }

    if (productID) {
      whereClause.productID = productID;
    }

    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const comments = await Comments.findAndCountAll({
      where: whereClause,
      include: [
        { model: Users, attributes: ["id", "fullName"] },
        { model: Products, attributes: ["id", "name"] },
      ],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      total: comments.count,
      page: pageNumber,
      pageSize: pageSize,
      data: comments.rows,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comments.findByPk(id, {
      include: [
        { model: Users, attributes: ["id", "fullName"] },
        { model: Products, attributes: ["id", "name"] },
      ],
    });

    if (!comments)
      return res.status(404).json({ message: "Comments not found!" });

    res.status(200).send({ data: comments });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = commentsValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let updateComments = await Comments.update(value, { where: { id } });
    if (!updateComments) {
      return res.status(404).send({ message: "Comment not found ❗" });
    }

    const result = await Comments.findByPk(id);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteComments = await Comments.destroy({ where: { id } });
    if (!deleteComments) {
      return res.status(404).send({ message: "Branch not found ❗" });
    }

    res.status(200).send({ message: "Branch deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export { create, getAll, getOne, update, remove };
