const express = require('express')
const router = express.Router()
const { authentication, isAdmin } = require('../middleware/authentication.js')
const CommentsController = require('../controllers/CommentController.js')


router.post('/id/:id',authentication,CommentsController.create)
router.delete('/id/:id',authentication,CommentsController.delete)
router.put('/id/:id',authentication,CommentsController.update)
router.put('/like/:id',authentication,CommentsController.like)
router.put('/dislike/:id',authentication,CommentsController.dislike)
// router.delete('/comments/:id', authentication, isAdmin, CommentsController.delete);



module.exports = router