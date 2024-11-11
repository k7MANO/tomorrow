const Sequelize = require('sequelize')
const db = require('../db')
const teste = db.define('teste', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_usuario: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true
  },

  descricao: {
    type: Sequelize.STRING(150),
    allowNull: true
  },
  foto_perfil: {
    type: Sequelize.BLOB,
    allowNull: true
  }
})

module.exports = teste
