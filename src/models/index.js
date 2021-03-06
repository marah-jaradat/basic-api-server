"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food");
const clothes = require("./clothes");

// const POSTGRES_URL =
//   process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL; // npm i sqlite3

// let sequelizeOptions =
//   process.env.NODE_ENV === "production"
//     ? {
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {};

// let sequelize = new Sequelize(POSTGRES_URL);

const postgresURL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;
const sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {};
const sequelize = new Sequelize(postgresURL, sequelizeOptions);

// const POSTGRES_URL =
//   process.env.DATABASE_URL ||
//   "postgres://marah-jaradat:04021997*Marah@localhost:5432//newDB";

// let sequelizeOptions = {
//   dialectOption: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// };

// let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  clothes: clothes(sequelize, DataTypes),
  food: food(sequelize, DataTypes),
};
