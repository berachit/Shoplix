import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { orderMail } from "../utils/sendMail.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address = {}, items = [], amount, paymentMethod } = req.body;
    const normalizedAddress = {
      ...address,
      addressLine1: address.addressLine1 || address.street,
      addressLine2: address.addressLine2 || "",
      state: address.state || address.city,
      pinCode: Number(address.pinCode || address.zipCode),
    };
    const normalizedPaymentMethod =
      {
        card: "Stripe",
        upi: "Razorpay",
        cod: "COD",
      }[paymentMethod] || paymentMethod;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = user.cartData;
    const hasCartItems = cartData.size > 0;
    const hasSubmittedItems = Array.isArray(items) && items.length > 0;

    if (!hasCartItems && !hasSubmittedItems) {
      return res.json({ success: false, message: "Cart is Empty!" });
    }

    const orderItems = [];

    let totalAmount = 0;

    if (hasCartItems) {
      for (const [productId, quantity] of cartData) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.json({
            success: false,
            message: `Product not available: ${productId}`,
          });
        }
        const item = {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image[0]?.url || "",
          size: "", //////////////////
        };
        orderItems.push(item);
        totalAmount += product.price * quantity;
      }
    } else {
      for (const item of items) {
        orderItems.push({
          productId: item.productId,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image || "",
          size: item.size || "",
        });
      }
      totalAmount =
        Number(amount) ||
        orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      amount: totalAmount,
      address: normalizedAddress,
      paymentMethod: normalizedPaymentMethod,
    });

    
    await newOrder.save();
    
    await orderMail(normalizedAddress.email, newOrder)
    
    user.cartData = new Map();

    await user.save();

    res.json({ success: true, message: "Order Placed", newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const allowedStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order Status Updated",
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
