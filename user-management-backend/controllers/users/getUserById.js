import User from "../../models/user.js"

const getUserById = async (req, res, next) => {
    const id = req.params.id
    try {
        const userDetails = await User.findOne({ id })
        res.send(userDetails)
    } catch (err) {
        next(err)
    }
}

export default getUserById