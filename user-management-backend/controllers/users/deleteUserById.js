import User from "../../models/user.js"

const deleteUserById = async (req, res, next) => {
    try {
        await User.findOneAndDelete({ id: req.params.id })
        res.send({ msg: "user deleted successfully." })
    } catch (err) {
        next(err)
    }
}

export default deleteUserById