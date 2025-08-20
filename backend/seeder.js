import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import categories from "./data/category.js";
import messages from "./data/message.js";
import products from "./data/items.js";
import Product from "./models/itemModel.js";
import User from "./models/userModel.js";
import Order from "./models/bookingModel.js";
import Category from "./models/categoryModel.js";
import Message from "./models/messageModel.js";
import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Message.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    await Category.insertMany(categories);
    await Message.insertMany(messages)
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

console.log(process.argv[2]);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}