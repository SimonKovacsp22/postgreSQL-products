import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import productsRouter from "./products/index.js";
import categoryRouter from "./categories/index.js";
import ProductModel from "../src/products/model.js"
import CategoryModel from "../src/categories/model.js"
import ProductCategoryModel from "../src/productCategory/model.js"
import userRouter from "../src/users/index.js"
import reviewRouter from "../src/reviews/index.js"
import ReviewModel from "../src/reviews/model.js"
import UserModel from "../src/users/model.js"
import CartModel from "../src/cart/model.js"
import CartProductModel from "../src/cartProduct/model.js"


ProductModel.belongsToMany(CategoryModel,{through: ProductCategoryModel })
CategoryModel.belongsToMany(ProductModel,{through: ProductCategoryModel})
ProductCategoryModel.belongsTo(ProductModel)

UserModel.hasMany(ReviewModel)
ReviewModel.belongsTo(UserModel)

ProductModel.hasMany(ReviewModel)
ReviewModel.belongsTo(ProductModel)

UserModel.hasMany(CartModel)
CartModel.belongsTo(UserModel)

CartModel.belongsToMany(ProductModel,{ through: CartProductModel})
ProductModel.belongsToMany(CartModel, {through: CartProductModel})
CartProductModel.belongsTo(CartModel)




const server = express()

server.use(express.json())

server.use(cors())

server.use('/products',productsRouter)
server.use('/category',categoryRouter)
server.use('/users',userRouter)
server.use('/reviews', reviewRouter)

const { PORT } = process.env

const initalize = async () => {
    try {
      server.listen(PORT, async () => {
        console.log("✅ Server is listening on port " + PORT);
      });
  
      server.on("error", (error) => {
        console.log("❌ Server is not running due to error : " + error);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  authenticateDB()
    .then(async () => {
      await syncModels();
    })
    .then(() => {
      initalize();
    })
    .catch((e) => console.log(e));