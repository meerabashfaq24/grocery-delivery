const Order = require("../models/Order");
const Product = require("../models/Product");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("user", "name email")
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const placeOrderStripe = async (req, res) => {
  try {
    console.log("Stripe route reached");

    const { products } = req.body;
console.log("Products received:", products);
let totalPrice = 0;

for (const item of products) {
  const product = await Product.findById(item.product);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  totalPrice += product.price * item.quantity;
}
const order = await Order.create({
  user: req.user._id,
  products,
  totalPrice,
  paymentMethod: "Stripe",
  paymentStatus: "Pending",
  status: "Pending",
});

    const line_items = [];

  

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

   const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items,

  metadata: {
  orderId: order._id.toString(),
  userId: req.user._id.toString(),
},

payment_intent_data: {
  metadata: {
    orderId: order._id.toString(),
    userId: req.user._id.toString(),
  },
},

  success_url: `${process.env.CLIENT_URL}/success`,
  cancel_url: `${process.env.CLIENT_URL}/cart`,
});
order.stripeSessionId = session.id;
await order.save();
    res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Cart = require("../models/Cart");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook Signature Error:", err.message);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Webhook Event:", event.type);
   res.json({ received: true });
};

 
;

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
   placeOrderStripe,
   stripeWebhook,
};