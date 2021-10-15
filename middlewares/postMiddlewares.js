const { Op } = require('sequelize');
const token = require('../services/tokenJwt');
const { Categories, Users } = require('../models');

const verifyCategoryIdExists = async (req, res, next) => {
    const { categoryIds } = req.body;
    if (typeof categoryIds !== 'object') {
        return res.status(400).json({ message: 'categoryIds is required of array' });
    }
      const categories = await Categories.findAll({
            where: { id: { [Op.in]: categoryIds } },
});

 if (categories.length === 0) {
     return res.status(400).json({ message: '"categoryIds" not found' });
 }
   next();
};

const validateCategoryId = async (req, res, next) => {
    const { categoryIds } = req.body;
    if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
    next();
};

const validateTokenFn = (req, res, next) => {
    const { authorization } = req.headers;
    const validateToken = token.validateToken(authorization);
    if (validateToken.status) {
        return res.status(validateToken.status).json({ message: validateToken.message });
    }
    req.payload = validateToken;
    next();
};

const validateTitle = (req, res, next) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: '"title" is required' });
    next();
};

const validateContent = (req, res, next) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: '"content" is required' });
    next();
};

const searchUser = async (req, res, next) => {
  const { payload: { email } } = req;
  const user = await Users.findOne({ email });
  req.userId = user.id;
  next();
};

module.exports = {
    verifyCategoryIdExists,
    validateCategoryId,
    validateTitle,
    validateContent,
    validateTokenFn,
    searchUser,
};