const serviceCategory = require('../services/serviceCategory');

const createCategory = async (req, res) => {
  const dataBody = req.body;
  const { status, data } = await serviceCategory.createCategory(dataBody);
  return res.status(status).json(data);
};

const getCategories = async (req, res) => {
  const { status, data } = await serviceCategory.getCategories();
  return res.status(status).json(data);
};

module.exports = {
  createCategory,
  getCategories,
};