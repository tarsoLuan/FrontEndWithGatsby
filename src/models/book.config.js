const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')

const Book = db.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
})

Book.sync()

module.exports = Book