const express = require('express');
const router = new express.Router();

router.get('/articles', (req, res) => {
    res.send('ROTA DE ARTIGO')
})

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new')
})

module.exports = router