import express from "express"
import getAllUsers from "../controllers/users/getAllUsers.js"
import createNewUser from "../controllers/users/createNewUser.js"
import getUserById from "../controllers/users/getUserById.js"
import deleteUserById from "../controllers/users/deleteUserById.js"
import updateUser from "../controllers/users/updateUser.js"
import User from "../models/user.js"

const router = express.Router()


router.get("/", getAllUsers)

router.post('/', createNewUser)

router.get("/:id", getUserById)

router.put("/:id", updateUser)

router.delete("/:id", deleteUserById)

router.post("/many", async (req, res, next) => {
    try {
        const response = await User.insertMany(req.body)
        response.send(response)
    } catch (err) {
        next(err)
        res.send({ err: "err in insertion" })
    }
})
export default router
