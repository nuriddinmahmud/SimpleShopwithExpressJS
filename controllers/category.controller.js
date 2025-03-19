const Category = require("../models/category.model");
const Validation = require("../validations/category.validation");

async function getAll(req, res) {
  try {
    if (req.query.name) {
      const categories = await Category.findAll({
        where: { name: req.query.name },
      });
      res.send(categories);
      return;
    } else {
      res.send(`${req.query.name} not found`);
    }
    const category = await Category.findAll();
    res.send(category);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function getOne(req, res) {
  try {
    const categories = await Category.findOne(req.params.id);
    res.send(categories);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function post(req, res) {
  try {
    const cat = await Category.findOne({ where: { name: req.body.name } });
    if (cat) {
      res.status(400).send("Category already exists!");
      return;
    }
    const { error } = Validation.categoryValidation.validate(req.body);
    if (error) {
      res.send(error.message);
      return;
    }
    const categories = await Category.create(req.body);
    res.send(categories);
  } catch (error) {
    res.send(error.message);
  }
}

async function update(req, res) {
  try {
    const { error } = Validation.categoryValidationUpdate.validate(req.body);
    if (error) {
      res.send(error.message);
      return;
    }
    let id = req.params.id;
    let category = await Category.findByPk(id);
    if (!category) {
      res.status(404).send("Not found");
      return;
    }
    await category.update(req.body);
    res.send(category);
  } catch (error) {
    res.send(error.message);
  }
}

async function remove(req, res) {
  try {
    let id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).send("Not found");
      return;
    }
    await category.destroy();
    res.send("Deleted");
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = { getAll, getOne, update, remove, post };
