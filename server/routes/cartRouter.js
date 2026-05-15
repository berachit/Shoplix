import express from "express"
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController.js";
import { authUser } from "../middleware/authUser.js";

export const cartRouter = express.Router();

cartRouter.post("/add",authUser, addToCart);
cartRouter.post("/update",authUser,updateCart)
cartRouter.post("/remove",authUser, removeFromCart);
cartRouter.get("/get",authUser,getCart);