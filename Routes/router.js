const express = require('express')

const router = new express.Router()
const userController = require('../Controllers/userController')
const blogController = require('../Controllers/blogController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


// register API
router.post('/user/register',userController.register)

// login API
router.post('/user/login',userController.login)

// add blog
router.post('/blogs/add',jwtMiddleware,multerConfig.single('blogImage'),blogController.addBlog)

// get user blog
router.get('/user/all-blogs',jwtMiddleware,blogController.alluserBlogs)
// get all blogs
router.get('/blogs/all',jwtMiddleware,blogController.allBlogs)

// editblogs
router.put('/blogs/edit/:id',jwtMiddleware,multerConfig.single('blogImage'),blogController.editBlogsControll)
// 
router.delete('/blog/remove/:id',jwtMiddleware,blogController.deleteBlogControll)


// view vlog
router.get('/blogs/view/:id',jwtMiddleware,blogController.viewBlogs)


// updateuser
router.put('/user/update',jwtMiddleware,multerConfig.single('profileImage'),userController.editUser)
// export router
module.exports = router