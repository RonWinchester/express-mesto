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
    .then((users) => {
      if (users === null) {
        return res.status(404).send({ message: 'Пользователи не найдены' });
      }
      return res.status(200).send({ users });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user.id,
      });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.editProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};
