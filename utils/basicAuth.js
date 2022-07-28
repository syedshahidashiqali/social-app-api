const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}

const authUser = (req, res, next) => {
    if(req.user == null) {
        res.status(403),json("You need to sign in")
    }

    next()
}

const authRole = role => {
    return (req, res, next) => {
        if(req.user.role == role) {
            res.status(401).json("Not Allowed")
        }
        
        next()
    }
}

module.exports = {
    ROLE,
    authUser,
    authRole
}