const Regions = require("../models/regions.model.js");
const { Op } = require("sequelize");
const {
  regionsValidation,
  regionsValidationUpdate,
} = require("../validations/regions.validation.js");

const create = async (req, res) => {
  try {
    const { error, value } = regionsValidation(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newRegion = await Regions.create(value);
    res.status(200).send({ data: newRegion });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const regions = await Regions.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      total: regions.count,
      page: pageNumber,
      pageSize: pageSize,
      data: regions.rows,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Regions.findByPk(id);

    if (!region) return res.status(404).json({ message: "Region not found" });

    res.status(200).send({ data: region });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = regionsValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const [updated] = await Regions.update(value, { where: { id } });
    if (!updated) {
      return res.status(404).send({ message: "Region not found ❗" });
    }

    const result = await Regions.findByPk(id);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Regions.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Region not found ❗" });
    }
    res.status(200).send({ message: "Region deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = { create, getAll, getOne, update, remove };
