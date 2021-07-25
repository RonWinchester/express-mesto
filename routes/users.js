const usersRouter = require('express').Router();

const {
  createUser,
  getUsers,
  getUser,
  editProfile,
  editAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', editProfile);
usersRouter.patch('/users/me/avatar', editAvatar);

module.exports = usersRouter;
