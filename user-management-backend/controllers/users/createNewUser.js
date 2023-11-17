import User from "../../models/user.js"

const createNewUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.send(newUser)
    } catch (err) {
        next(err)
    }
}

export default createNewUser