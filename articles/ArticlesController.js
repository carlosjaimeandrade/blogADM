const express = require('express');
const router = new express.Router();
const Category = require('../categories/category')
const Article = require('./Article')
const slugify = require('slugify');


router.get('/admin/articles', (req, res) => {
    res.render('admin/articles/index')
})

router.get('/admin/articles/new', (req, res) => {

    Category.findAll({
        raw: true, order: [['id', 'DESC']]
    }).then(categorias => {
        res.render('admin/articles/new',{
            categorias: categorias
        })
    })
    
})

router.post('/admin/articles/new', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;
    
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/articles')
    })
    
})

module.exports = router