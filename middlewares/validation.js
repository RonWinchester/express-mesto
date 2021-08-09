const { celebrate, Joi } = require('celebrate');

module.exports.cardsCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^((http|https):\/\/)(www\.)?[A-Za-z0-9]*(([\w#!:.?+=&%@!\-/])*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

module.exports.loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

module.exports.paramsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});

module.exports.userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});

module.exports.editProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.editAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?[A-Za-z0-9]*(([\w#!:.?+=&%@!\-/])*)/),
  }),
});
