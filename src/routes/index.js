const { Router } = require('express')
const router = Router();

const { readPosts, createPost, deletePost } = require('../controllers/index.controller')
 
router.get('/post/read', readPosts)
router.post('/post/create', createPost)
router.put('/post/delete/:id', deletePost)

module.exports = router