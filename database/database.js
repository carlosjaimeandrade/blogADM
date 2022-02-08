const Sequelize = require('sequelize')

//configurando o timesoze
const connection = new Sequelize('blogadm','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timesoze: '-03:00'
})

module.exports = connection;