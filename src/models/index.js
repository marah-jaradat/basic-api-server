"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food");
const clothes = require("./clothes");

const POSTGRES_URL =
  process.env.DATABASE_URL ||
  "postgres://marah-jaradat:04021997*Marah@localhost:5432//newDB";

let sequelizeOptions = {
  dialectOption: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  food: food(sequelize, DataTypes),
  clothes: clothes(sequelize, DataTypes),
};