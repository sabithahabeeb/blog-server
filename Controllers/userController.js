const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

// register
exports.register = async (req, res) => {
    console.log("Inside register controller");
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist....")
        } else {
            const newUser = new users({
                username, email, password, profile: "", aboutme: "", facebook: "", instegram: "", twitter: ""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(`Register Failed ${err}`)

    }

}

// login
exports.login = async (req, res) => {
    console.log("Inside login function");
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "superseceretkey12345")
            res.status(200).json({ existingUser, token })

        } else {
            res.status(404).json(`Incorrect Email/Password`)
        }

    } catch (err) {
        res.status(401).json(`Login Failed ${err}`)

    }
}


// edit user
exports.editUser = async (req, res) => {
    const userId = req.payload
    const { username, email, password, profile, aboutme, facebook, instegram, twitter } = req.body
    const uploadImage = req.file ? req.file.filename : profile
    try {
        const updatedUSer = await users.findByIdAndUpdate({ _id: userId }, { username, email, password, profile: uploadImage, aboutme, facebook, instegram, twitter }, { new: true })
        await updatedUSer.save()
        res.status(200).json(updatedUSer)
    } catch (err) {
        res.status(401).json(err)
    }
}