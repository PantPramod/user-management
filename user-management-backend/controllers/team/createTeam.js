import Team from "../../models/team.js"

const createTeam = async (req, res, next) => {
    try {
        const response = await Team.create(req.body)
        res.send(response)
    } catch (err) {
        next(err)
    }
}

export default createTeam