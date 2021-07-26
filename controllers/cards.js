const Card = require('../models/card');

const ERROR_CODE = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Карточки не найдены' });
      }
      return res.status(200).send({ card });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
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
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards === null) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные для поставновки лайка',
        });
      }
      return res.status(200).send({ cards });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards === null) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные для снятия лайка',
        });
      }
      return res.status(200).send({ cards });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};
