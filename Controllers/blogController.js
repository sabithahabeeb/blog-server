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


//get tech blogs
// exports.allBlogs = async (req, res) => {
//     const searchKey = req.query.search
//     const query = {
//         category: { $regex: searchKey, $option: "i" }
//     }
//     try {
//         const allBlogs = await blogs.find(query)
//         res.status(200).json(allBlogs)
//     } catch (err) {
//         res.status(401).json(err)
//     }
// }

