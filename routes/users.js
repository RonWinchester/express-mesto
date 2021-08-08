const usersRouter = require('express').Router();

const {
  getUsers,
  getUser,
  editProfile,
  editAvatar,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/users/me', getUserInfo);
usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.patch('/users/me', editProfile);
usersRouter.patch('/users/me/avatar', editAvatar);

module.exports = usersRouter;
