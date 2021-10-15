const rescue = require('express-rescue');
const { BlogPost, User } = require('../models');
const httpStatus = require('../utils/httpStatus');

const create = rescue(async (req, res) => {
  const { title: postTitle, content: postContent } = req.body;
  const { email } = req.user;

  const { id: userUID } = await User.findOne({ where: { email } });

  const newBlogPost = await BlogPost.create({
    title: postTitle,
    content: postContent,
    userId: userUID,
    published: new Date(),
    updated: new Date(),
  }).then((newPost) => {
    const { id, title, content, userId } = newPost;
    return res.status(httpStatus.HTTP_CREATE_STATUS).json({ id, title, content, userId });
  }).catch((e) => console.log(e));

  return newBlogPost;
});

const getAll = async (_req, res) => BlogPost.findAll(
  { include: [
    { model: 'BlogPost', attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'] },
    { model: 'User', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: 'Category', attributes: [] }] },
  ).then((allPosts) => res.status(httpStatus.HTTP_OK_STATUS).json(allPosts))
    .catch((e) => console.log(e));

module.exports = {
  create,
  getAll,
};

// Método findAll: https://stackoverflow.com/questions/21883484/how-to-use-an-include-with-attributes-with-sequelize
// Documentação: https://sequelize.org/master/manual/model-querying-finders.html#-code-findall--code-
