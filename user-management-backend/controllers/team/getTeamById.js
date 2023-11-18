import Team from "../../models/team.js"

const getTeamById = async (req, res, next) => {
    try {
        const teamDetailed = await Team.findById(req.params.id)
        res.send(teamDetailed)
    } catch (err) {
        next(err)
    }
}

export default getTeamById