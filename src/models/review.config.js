const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')
const User = require('../model/user.config.js')
const Book = require('../model/book.config.js')

const Review = db.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

Review.belongsTo(User, {
    foreignKey: 'userId',
})
Review.belongsTo(Book, {
    foreignKey: 'bookId',
})

Review.sync()

module.exports = Review