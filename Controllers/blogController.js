const blogs = require('../Models/blogSchema')

// add blog
exports.addBlog = async (req,res)=>{
    console.log("Inside add blog function");
    const userId = req.payload
    const blogImage = req.file.filename
    
    const {title,overview,category} = req.body
    // console.log(`${userId},${title},${overview},${category},${blogImage}`);
    try{
        const newblog = new blogs({
            title,overview,category,blogImage,userId
        })
        await newblog.save()
        res.status(200).json(newblog)

    }catch(err){
        res.status(401).json(`Request failed, Error:${err}`)
    }
    res.status(200).json("Addblogs request recieved")
}