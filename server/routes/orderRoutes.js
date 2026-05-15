import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import { authUser } from "../middleware/authUser.js";
import { adminAuth } from "../middleware/adminAuth.js";

export const orderRouter = express.Router();

orderRouter.post("/placeOrder", authUser, placeOrder);
orderRouter.get("/userOrders", authUser, userOrders);
orderRouter.get("/listOrders", adminAuth, listOrders);
orderRouter.post("/updateStatus", adminAuth, updateStatus);