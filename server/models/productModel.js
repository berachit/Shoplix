import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        url:{
          type: String,
          required: true,
        },
        public_id:{
          type: String,
          required: true,
        }
      }
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    bestSeller: {
      type: Boolean,
    //   default: false,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// this line prevents the model from being created multiple times.
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
