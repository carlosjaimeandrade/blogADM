const express = require('express');
const router = new express.Router();

router.get('/categories', (req, res) => {
    res.send('ROTA DE CATEGORIA')
})

router.get('/admin/categories/new', (req, res) => {
    res.send('ROTA DE NOVA CATEGORIA')
})

module.exports = router