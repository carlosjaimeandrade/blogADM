const express = require('express');
const router = new express.Router();

router.get('/articles', (req, res) => {
    res.send('ROTA DE ARTIGO')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('ROTA DE NOVA ARTIGO')
})

module.exports = router