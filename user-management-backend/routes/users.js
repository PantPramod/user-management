import express from "express"
import getAllUsers from "../controllers/users/getAllUsers.js"
import createNewUser from "../controllers/users/createNewUser.js"
import getUserById from "../controllers/users/getUserById.js"
import deleteUserById from "../controllers/users/deleteUserById.js"
import updateUser from "../controllers/users/updateUser.js"
import User from "../models/user.js"
import getAllDomains from "../controllers/users/getAllDomains.js"

const router = express.Router()


router.get("/", getAllUsers)

router.post('/', createNewUser)


router.get("/alldomains", getAllDomains)

router.get("/:id", getUserById)

router.put("/:id", updateUser)

router.delete("/:id", deleteUserById)


export default router
