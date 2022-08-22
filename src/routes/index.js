const { Router } = require('express')
const router = Router();

const { readPosts, createPost, deletePost, readsPosts } = require('../controllers/index.controller')
 
router.get('/post/read', readPosts)
router.post('/post/create', createPost)
router.put('/post/delete/:id', deletePost)

// Probando Paginación
router.get('/post/reads/:limit/:offset', readsPosts)

module.exports = router