async function guardAdmin(req, res, next) {
    try {
        if(req.user.role === 'Admin'){
            next()
        } else {
            throw { name: "Unauthorized"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = guardAdmin;