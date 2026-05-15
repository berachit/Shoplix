import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "shoplix_products",
        });

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: sizes ? JSON.parse(sizes) : [],
      date: Date.now(),
    };

    console.log(productData);

    const newProduct = new Product(productData);

    await newProduct.save();

    res.json({
      success: true,
      message: "Product Added",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort,
    } = req.query;

    const filter = {};

    if (keyword) {
      filter.name = {
        $regex: keyword,
        $options: "i", // i => case insensitive
      };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

    if (sort === "lowToHigh") {
      sortOption.price = 1;
    }
    if (sort === "highToLow") {
      sortOption.price = -1;
    }
    if (sort === "newest") {
      sortOption.createdAt = -1;
    }

    const pageNumber = Number(page);

    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      success: true,
      products,
      totalProducts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    await Promise.all(
      product.image.map(async (item) => {
        await cloudinary.uploader.destroy(item.public_id);
      }),
    );

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const singleProductInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
