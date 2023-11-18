import express from "express"
import createTeam from "../controllers/team/createTeam.js"
import getAllTeams from "../controllers/team/getAllTeams.js"
import getTeamById from "../controllers/team/getTeamById.js"

const router = express.Router()


router.post("/", createTeam)

router.get("/", getAllTeams)

router.get("/:id", getTeamById)

export default router