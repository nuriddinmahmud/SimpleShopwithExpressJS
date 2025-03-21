const Category = require("../models/category.model");
const {
  categoryValidation,
  categoryValidationUpdate,
} = require("../validations/category.validation.js");

async function getAll(req, res) {
  try {
    if (req.query.name) {
      const categories = await Category.findAll({
        where: { name: req.query.name },
      });
      res.send(categories);
      return;
    }
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function getOne(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.send(category);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function post(req, res) {
  try {
    const { error } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    const cat = await Category.findOne({ where: { name: req.body.name } });
    if (cat) {
      return res.status(400).send("Category already exists!");
    }
    const category = await Category.create(req.body);
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function update(req, res) {
  try {
    const { error } = categoryValidationUpdate.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    await category.update(req.body);
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function remove(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    await category.destroy();
    res.send("Deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = { getAll, getOne, update, remove, post };
