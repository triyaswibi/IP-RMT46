const midtransClient = require("midtrans-client");
const { Vechile } = require("../models");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

module.exports = class PaymentController {
  static async initiateMidtransTrx(req, res, next) {
    try {
      const { id } = req.params

      const vechile = await Vechile.findByPk(+id);

      const orderId = Math.random().toString();
      const amount = vechile.price;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          full_name: req.user.fullName,
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }
};
