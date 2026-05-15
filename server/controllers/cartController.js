import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);

    const cartData = user.cartData;

    if (cartData.get(productId)) {
      cartData.set(productId, cartData.get(productId) + 1);
    } else {
      cartData.set(productId, 1);
    }

    await user.save();

    res.json({
      success: true,
      message: "Added To Cart",
      cartData
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const parsedQuantity = Number(quantity);

    if (isNaN(parsedQuantity)) {
      return res.json({
        success: false,
        message: "Invalid quantity",
      });
    }

    const user = await User.findById(userId);
    const cartData = user.cartData;

    if (!cartData.get(productId)) {
      return res.json({ success: false, message: "Product not in cart" });
    }

    if (parsedQuantity <= 0) {
      cartData.delete(productId);
    } else {
      cartData.set(productId, parsedQuantity);
    }

    await user.save();

    res.json({
      success: true,
      message: "Cart Updated",
      cartData
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    const cartData = user.cartData;

    if (!cartData.get(productId)) {
      return res.json({ success: false, message: "Product not in cart" });
    }

    cartData.delete(productId);
    await user.save();

    res.json({ success: true, message: "Product Removed" ,
        cartData
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const cartData = user.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
