const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const router = require('./routes/router');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// роуты, не требующие авторизации
app.post('/signup', createUser);
app.post('/signin', login);

// авторизация
app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
