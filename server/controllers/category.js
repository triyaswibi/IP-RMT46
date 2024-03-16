const { Category } = require('../models');

module.exports = class categoryController {
    static async getCategory(req, res, next) {
        try {
            const showCategory = await Category.findAll();
            res.status(200).json(showCategory)
        } catch (error) {
            next(error)
        }
    }
            
    static async createCategory(req, res, next){
        try {
            const createCategory = await Category.create(req.body)
            res.status(201).json(createCategory)
        } catch (error) {
            next(error)
        }
    }

    static async updateCategoryById(req, res, next) {
        const { id } = req.params
        try {
            const findCategory = await Category.findByPk(+id)
            if(!findCategory) throw {name: "NotFound"}
            
            await findCategory.update(req.body)
            res.status(200).json({ msg: `Category ${findCategory.category} has been updated` })
        } catch (error) {
            next(error)
        }
    }
}