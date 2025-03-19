const Products = require("../models/products.model.js");
const Users = require("../models/users.model.js");
const Category = require("../models/category.model.js");
const { Op } = require("sequelize");
const {
  productsValidation,
  productsValidationUpdate,
} = require("../validations/products.validation.js");

const create = async (req, res) => {
  try {
    const { error, value } = productsValidation(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newProducts = await Products.create(value);
    res.status(200).send({ data: newProducts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { search, page, limit, userID, categoryID } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }
    if (userID) {
      whereClause.userID = userID;
    }

    if (categoryID) {
      whereClause.categoryID = categoryID;
    }

    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const products = await Products.findAndCountAll({
      where: whereClause,
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Users, attributes: ["id", "name"] },
      ],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      total: products.count,
      page: pageNumber,
      pageSize: pageSize,
      data: products.rows,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id, {
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Users, attributes: ["id", "name"] },
      ],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).send({ data: product });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = productsValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let updateProduct = await Products.update(value, { where: { id } });
    if (!updateProduct) {
      return res.status(404).send({ message: "Products not found ❗" });
    }

    const result = await Products.findByPk(id);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteProducts = await Products.destroy({ where: { id } });
    if (!deleteProducts) {
      return res.status(404).send({ message: "Products not found ❗" });
    }

    res.status(200).send({ message: "Products deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports =  { create, getAll, getOne, update, remove };
