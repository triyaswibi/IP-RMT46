const { Vechile } = require('../models');


async function authorization (req, res, next) {
    try {
        if(req.user.role === "Admin"){
            next()
        } else {
        const {id} = req.params
        
        let vehicle = await Vechile.findByPk(id)

        if(!vehicle) throw {name: "vehicle not found"}
        if(vehicle.authorId !== req.user.id) throw {name: "forbiden access"}

        next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization;