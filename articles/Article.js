const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/category')
const slugify = require('slugify');


const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// 1 p m = hasMany(),
Category.hasMany(Article)
// 1 p 1 = belongsTo(),
Article.belongsTo(Category)

//Article.sync({force: true})

module.exports = Article;