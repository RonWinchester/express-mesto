const Card = require('../models/card');

const ERROR_CODE = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NoCards'))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.message === 'NoCards') {
        return res.status(404).send({ message: 'Карточки не найдены' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidIdCard'))
    .then((cards) => {
      res.status(200).send({ cards });
    })
    .catch((err) => {
      if (err.message === 'NotValidIdCard') {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else { res.status(500).send({ message: `Произошла ошибка ${err}` }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidIdCard'))
    .then((cards) => {
      res.status(200).send({ cards });
    })
    .catch((err) => {
      if (err.message === 'NotValidIdCard') {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      } else { res.status(500).send({ message: `Произошла ошибка ${err}` }); }
    });
};
