const { Vechile, User, Category } = require('../models');
const cloudinary  = require('cloudinary').v2;   

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = class vechileController {
    static async getVechile(req, res, next) {
        try {
            const showVechile = await Vechile.findAll({
                include: [{
                    model: User,
                    attributes: ["email"]
            }, {
                model: Category
            }] 
        });
            res.status(200).json(showVechile)
        } catch (error) {
            next(error)
        }
    }
        
    static async createVechile(req, res, next){
        try {
            const createVechile = await Vechile.create({...req.body, authorId: req.user.id})
            res.status(201).json(createVechile)
        } catch (error) {
            next(error)
        }
    }

    static async getVechileById(req, res, next) {
        const { id } = req.params
        try {
            const findVechile = await Vechile.findByPk(id, {include : [{ model: Category}]})
            if(!findVechile) throw {name: "NotFound"}

            res.status(200).json(findVechile)
        } catch (error) {
            next(error)
        }
    }

    static async updateVechileById(req, res, next) {
        const { id } = req.params
        try {
            const findVechile = await Vechile.findByPk(+id)
            if(!findVechile) throw {name: "NotFound"}

            const { name, description, imgUrl, price, categoryId, authorId } = req.body

            await findVechile.update({ name, description, imgUrl, price, categoryId, authorId })
            res.status(200).json(findVechile)
        } catch (error) {
            next(error)
        }
    }

    static async deactiveVechileById(req, res, next) {
        const { id } = req.params
        try {
            const findVechile = await Vechile.findByPk(+id)
            if(!findVechile)  throw {name: "NotFound"}

            await findVechile.destroy()
            res.status(200).json({ msg: `Vechile ${id} deleted` })
        } catch (error) {
            next(error)
        }
    }

    static async updateVechileImgUrlById(req, res, next) {
        try {
            if (!req.file) throw { name: "CustomError", status: 400, message: "Image is required" };
    
            const mimetype = req.file.mimetype;
            const data = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${mimetype};base64,${data}`;
            
            const result = await cloudinary.uploader.upload(dataURI, {
                public_id: "Car_modified",
                folder: 'Showroom-Care'
            });
    
            const vechile = await Vechile.findByPk(req.params.id);
            if (!vechile) throw { name: "NotFound" };
    
            await Vechile.update({ imgUrl: result.secure_url });
            res.status(200).json({ message: `Image for ${vechile.name} successfully updated` });
        } catch (error) {
            next(error);
        }
    }
    
}