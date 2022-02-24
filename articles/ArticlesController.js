const express = require('express');
const router = new express.Router();
const Category = require('../categories/category')
const Article = require('./Article')
const slugify = require('slugify');


router.get('/admin/articles', (req, res) => {

    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles
        })
    })
})

router.get('/admin/articles/new', (req, res) => {

    Category.findAll({
        raw: true, order: [['id', 'DESC']]
    }).then(categorias => {
        res.render('admin/articles/new', {
            categorias: categorias
        })
    })

})

router.get('/admin/article/edit/:id', (req, res) => {
    const id = req.params.id

    Article.findByPk(id).then(article => {

        Category.findAll().then(Categories => {
            res.render("admin/articles/edit", {
                article: article,
                Categories: Categories
            })
        })

    })

})


router.post('/admin/article/edit/:id', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const categoryId = req.body.category
    const id = req.params.id

    Article.update(
        {
            title: title,
            body: body,
            categoryId: categoryId
        },
        {
            where: { id: id }
        }
    ).then(()=>{
        res.redirect("/admin/articles/")
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
    }).then(() => {
        res.redirect('/admin/articles')
    })

})


router.get('/admin/article/delete/:id', (req, res) => {
    const id = req.params.id

    if (id != undefined) {
        if (!isNaN(id)) {

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })

        } else {
            res.redirect('/admin/articles')
        }
    } else {
        res.redirect('/admin/articles')
    }

})

router.get("/article/page/:num", (req, res) =>{
    var page = req.params.num -1
    var offset = 0

    if(isNaN(page)){
        offset = 0
    }else{
        offset = page * 4
    }

    Article.findAndCountAll({
        order: [['id', 'DESC']],
        limit: 4,
        offset: offset
    }).then(articles=>{
        var next
        if(offset + 4 > articles.count ){
            next = false
        }else{
            next = true
        }
        var result = {
            page: parseInt(page) +1,
            offset: offset,
            next : next,
            articles: articles
        }

        Category.findAll().then(categories=>{
            res.render("admin/articles/page", {
                result: result,
                categories: categories
            })
        })
        
    

    })
})

module.exports = router