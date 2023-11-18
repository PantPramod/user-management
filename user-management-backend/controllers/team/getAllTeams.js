import Team from "../../models/team.js"

const getAllTeams = async (req, res, next) => {
    try {
        const allTeams = await Team.find();
        res.send(allTeams)
    } catch (err) {
        next(err)
    }
}

export default getAllTeams