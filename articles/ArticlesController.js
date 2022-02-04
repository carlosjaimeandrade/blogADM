const express = require('express');
const router = new express.Router();
const Category = require("../categories/Category")


router.get('/articles', (req, res) => {
    res.send('ROTA DE ARTIGO')
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

module.exports = router