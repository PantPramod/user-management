import User from "../../models/user.js"

const getAllDomains = async (req, res, next) => {
    try {
        const response = await User.distinct('domain')
        res.send(response)
    } catch (err) {
        next(err)
    }
}

export default getAllDomains