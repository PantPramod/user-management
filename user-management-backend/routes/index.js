import express from 'express'
import userRoute from './users.js'
import teamRoute from './team.js'

const router = express.Router()


router.use("/api/users", userRoute)

router.use("/api/team", teamRoute)


export default router