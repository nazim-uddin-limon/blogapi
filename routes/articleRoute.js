const router = require('express').Router();

const { articlePostController } = require('../controllers/articleController');

router.post('/', articlePostController)

module.exports = router