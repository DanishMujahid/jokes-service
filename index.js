const express = require('express');
const { Op } = require('sequelize');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/jokes', async (req, res, next) => {
  try {
    let where = {};
    if (req.query.tags) {
      where = {
        tags: {
          [Op.substring]: req.query.tags,
        },
      };
    } else if (req.query.content) {
      where = {
        joke: {
          [Op.substring]: req.query.content,
        },
      };
    }
    const jokes = await Joke.findAll({ where });
    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});



module.exports = app;
