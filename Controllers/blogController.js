const blogs = require('../Models/blogSchema')

// add blog
exports.addBlog = async (req, res) => {
    console.log("Inside add blog function");
    const userId = req.payload
    const blogImage = req.file.filename

    const { title, overview, category } = req.body
    // console.log(`${userId},${title},${overview},${category},${blogImage}`);
    try {
        const newblog = new blogs({
            title, overview, category, blogImage, userId
        })
        await newblog.save()
        res.status(200).json(newblog)

    } catch (err) {
        res.status(401).json(`Request failed, Error:${err}`)
    }
}

// get User blogs
exports.alluserBlogs = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await blogs.find({ userId })
        res.status(200).json(userProjects)

    } catch (err) {
        res.status(401).json(err)
    }
}


//get all blogs
exports.allBlogs = async (req, res) => {
    try {
        const allBlogs = await blogs.find()
        res.status(200).json(allBlogs)
    } catch (err) {
        res.status(401).json(err)
    }
}

// edit blogs
exports.editBlogsControll = async (req, res) => {
    const { id } = req.params
    const { title, overview, category, blogImage } = req.body
    const uploadImage = req.file ? req.file.filename : blogImage
    try {
        const updateblog = await blogs.findByIdAndUpdate({ _id: id }, {
            title, overview, category, blogImage: uploadImage
        }, { new: true })
        await updateblog.save()
        res.status(200).json(updateblog)
    } catch (err) {
        res.status(401).json(err)
    }

}


// delete blog
exports.deleteBlogControll = async (req, res) => {
    // get blog details
    const { id } = req.params
    try {
        const removeblog = await blogs.findByIdAndDelete({ _id: id })
        res.status(200).json(removeblog)
    } catch (err) {
        res.status(401).json(err)
    }
}



// get view blogs
exports.viewBlogs = async (req, res) => {
    const blogID = req.params
    try {
        const viewBlogs = await blogs.findById({ blogID })
        res.status(200).json(viewBlogs)

    } catch (err) {
        res.status(401).json(err)
    }
}