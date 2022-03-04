const Sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Category.sync({force: true})

module.exports = User;