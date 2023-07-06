const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { errors } = require('celebrate');



const app = express();


const { requestLogger, errorLogger } = require('./middlewares/logger');



const routes = require('./routes');

app.use(cors());

const {
  checkBodyLogin,
} = require('./middlewares/validation');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', checkBodyLogin, login);
app.post('/signup', checkBodyLogin, createUser);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {});
