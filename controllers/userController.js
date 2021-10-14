const userService = require('../services/userService');

const HTTP_CREATED_STATUS = 201;

// const getAll = (req, res, next) => {
//   User.findAll()
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).json({ message: 'Algo deu errado' });
//     });
// };

// const getById = (req, res) => {
//   User.findByPk(req.params.id)
//     .then(async (user) => {
//       if (user === null) {
//         res.status(404).send({ message: 'Usuário não encontrado' });
//       }

//       const products = await user.getProducts();

//       res.status(200).json({ ...user.dataValues, products });
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).json({ message: 'Algo deu errado' });
//     });
// };

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const response = await userService.insertUser({ displayName, email, password, image });

  if (response.code) {
    return res.status(response.code).json({
        message: response.message,
    });
}

  return res.status(HTTP_CREATED_STATUS).json(response);
};

// const update = async (req, res) => {
//   const { name, username, email, password } = req.body;

//   User.update(
//     { name, username, email, password },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((users) => {
//       res.status(200).send({ message: 'Usuário atualizado com sucesso.' });
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).send({ message: 'Algo deu errado' });
//     });
// };

// const remove = async (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((users) => {
//       res.status(200).send({ message: 'Usuário excluído com sucesso.' });
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).send({ message: 'Algo deu errado' });
//     });
// };

module.exports = {
  // getAll,
  // getById,
  create,
  // update,
  // remove,
}; 