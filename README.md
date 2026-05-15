# Shoplix - MERN Ecommerce Application

## Overview

Shoplix is a full-stack MERN ecommerce application built with a scalable backend architecture and modern frontend technologies.

The project includes:

* User authentication
* Admin authentication
* Product management
* Image uploads using Cloudinary
* Cart functionality
* Order management
* Email notifications using Nodemailer
* Product search, filtering, sorting, and pagination

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Nodemailer
* Cloudinary
* Multer

---

## Default Admin Credentials

ADMIN_EMAIL=[admin@shoplix.com](mailto:admin@shoplix.com)

ADMIN_PASSWORD=shoplix1234

---

# Features

## User Features

* User Registration & Login
* JWT Authentication
* Browse Products
* Product Search
* Product Filtering
* Product Sorting
* Add to Cart
* Update Cart
* Remove from Cart
* Place Orders
* View User Orders
* Order Confirmation Emails

---

## Admin Features

* Admin Login
* Add Products
* Delete Products
* Update Order Status
* View All Orders

---

# Backend Features

## Authentication

* JWT-based Authentication
* Protected Routes
* Admin Authorization Middleware
* Password Hashing using Bcrypt

---

## Product Management

* Add Product
* Delete Product
* List All Products
* Single Product Details
* Product Search
* Product Filtering
* Product Sorting
* Pagination

---

## Image Uploads

* Cloudinary Image Upload
* Cloudinary Image Deletion
* Multer File Upload Middleware

---

## Cart System

* Add to Cart
* Update Cart Quantity
* Remove from Cart
* Persistent Cart Storage

---

## Order System

* Place Orders
* User Orders
* All Orders (Admin)
* Update Order Status

---

## Email System

* Order Confirmation Emails using Nodemailer

---

# Folder Structure

## Backend

server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js

---

## Frontend

client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx


---

# Installation

## Backend Setup

```bash
cd server
npm install
npm run server
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# API Endpoints

## User Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/user/register | Register User |
| POST   | /api/user/login    | Login User    |

---

## Product Routes

| Method | Endpoint                        | Description    |
| ------ | ------------------------------- | -------------- |
| POST   | /api/product/add                | Add Product    |
| POST   | /api/product/delete             | Delete Product |
| GET    | /api/product/list               | Get Products   |
| GET    | /api/product/listOne/:productId | Single Product |

---

## Cart Routes

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/cart/add    | Add To Cart      |
| POST   | /api/cart/update | Update Cart      |
| POST   | /api/cart/remove | Remove From Cart |
| GET    | /api/cart/get    | Get Cart         |

---

## Order Routes

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | /api/order/placeOrder   | Place Order         |
| GET    | /api/order/userOrders   | User Orders         |
| GET    | /api/order/listOrders   | All Orders          |
| POST   | /api/order/updateStatus | Update Order Status |

---

# Future Improvements

* Google Authentication
* Password Reset using Email
* Razorpay Payment Integration
* Product Reviews & Ratings
* Wishlist System
* Admin Dashboard Analytics
* Deployment

---

# Author

Rachit Srivastava

---

# License

This project is for educational and portfolio purposes.
