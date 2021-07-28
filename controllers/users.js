const User = require('../models/user');

const ERROR_CODE = 400;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('NoUsers'))
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      if (err.message === 'NoUsers') {
        return res.status(404).send({ message: 'Пользователи не найдены' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user.id,
      });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

module.exports.editProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};
