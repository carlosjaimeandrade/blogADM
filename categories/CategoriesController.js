const express = require('express');
const router = new express.Router();
const Category = require("./Category")
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

router.post('/admin/categories/new', (req, res) => {
    const title = req.body.title
    if (title) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })      
    }else{
        res.redirect('/admin/categories/new')
    }

})

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categorias=>{
        res.render('admin/categories/index.ejs',{
            categorias: categorias
        })
    })
   
})

module.exports = router