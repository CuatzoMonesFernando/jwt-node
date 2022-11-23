import jwt, { decode } from "jsonwebtoken"
import config from "../config"
import { Role, User } from "../models"

const verifyToken = async (req, res, next ) => {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(403).json({ message: "no token provided" })

        const decoded = jwt.verify(token, config.SECRET)
        req.userID = decoded.id

        const user = await User.findById(req.userID, { password: 0 })
        if(!user) return res.status(404).json({ message: 'not user found'})
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized'})
    }
    
}

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userID)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return
        }
    }

    return res.status(403).json({ message: 'Required Moderator Role' })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userID)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return
        }
    }
    return res.status(403).json({ message: 'Required Administrator Role' })
}

export {
    verifyToken,
    isModerator,
    isAdmin
}