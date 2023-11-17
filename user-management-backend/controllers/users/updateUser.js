import User from "../../models/user.js"

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, { ...req.body })
        res.send(updatedUser)
    } catch (err) {
        next(err)
    }
}

export default updateUser