import Team from "../../models/team.js"

const createTeam = async (req, res, next) => {
    try {
        const teamPresent = await Team.findOne({ title: req.body.title })
        if (teamPresent?.title) {
            res.status(400).json({ msg: "same title exist" })
        }
        const response = await Team.create(req.body)
        res.send(response)
    } catch (err) {
        next(err)
    }
}

export default createTeam