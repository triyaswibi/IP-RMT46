module.exports = class homePage {
    static async home(req, res) {
        res.json({
            message: "Showroom Auto Care Showing Up"
        })
    }
}