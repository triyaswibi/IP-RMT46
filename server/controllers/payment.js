const midtransClient = require("midtrans-client");
const { Order } = require("../models")

module.exports = class PaymentController {
  static async initiateMidtransTrx(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });

      const orderId = Math.random().toString();
      const amount = 200_000_000;

      let parameter = {
        "transaction_details": {
          "order_id": orderId,
          "gross_amount": amount,
        },
        "credit_card": {
          "secure": true,
        },
        "customer_details": {
          "full_name": req.user.fullName,
          "email": req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      await Order.create({
        orderId,
        amount,
        userId: req.user.id,
      })

      res.json({ message: "Order created", transactionToken });
    } catch (error) {
      next(error);
    }
  }
};
