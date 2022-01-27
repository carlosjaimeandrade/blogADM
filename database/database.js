const Sequelize = require('sequelize')

const connection = new Sequelize('blogadm','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;