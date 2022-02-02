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
    } else {
        res.redirect('/admin/categories/new')
    }

})

router.get('/admin/categories/delete/:id', (req, res) => {
    const id = req.params.id

    if (id != undefined) {
        if (!isNaN(id)) {

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories')
            })

        } else {
            res.redirect('/admin/categories')
        }
    } else {
        res.redirect('/admin/categories')
    }


})

router.get('/admin/categories', (req, res) => {
    Category.findAll({
        raw: true, order: [['id', 'DESC']]
    }).then(categorias => {
        res.render('admin/categories/index.ejs', {
            categorias: categorias
        })
    })
})

router.get('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id

    //verifica se não é um numero
    if (isNaN(id)) {
        res.redirect('/admin/categories')
    }

    // pesquisa diretamente pelo id
    Category.findByPk(id).then(categorias => {
        if (categorias != undefined) {
            res.render('admin/categories/edit', {
                categorias: categorias
            })

        } else {
            res.redirect('/admin/categories')
        }
    }).catch(err => {
        res.redirect('/admin/categories')
    })
})

router.post('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title

    Category.update(
        {
            title: title,
            slug: slugify(title)
        },
        {
            where: { id: id }
        }
    ).then(() => {
        res.redirect('/admin/categories')
    })

})


module.exports = router