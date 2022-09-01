import express, { query } from 'express'
import ProductModel from './model.js'
import sequelize from '../db/index.js'
import { Op } from 'sequelize'
import CategoryModel from '../categories/model.js'
import ReviewModel from '../reviews/model.js'
import ProductCategoryModel from '../productCategory/model.js'

const productsRouter = express.Router()

productsRouter.get('/', async (req,res,next) => {
    try {
         const query = {}

         if(req.query.name) {
            query.name = {
                [Op.iLike]: `%${req.query.name}%`
            }
         }

         if(req.query.range) {
            query.price = {
                [Op.between] : req.query.range.split(',')
            }
         }

         if(req.query.category) {
            query.category = {
                [Op.in] : req.query.category.split(',')
            }
         }
        // attributes:['id',"name",'description',"price",'category','createdAt','updatedAt'],
        const products = await ProductModel.findAll({
          include:[ CategoryModel,ReviewModel],
           
            
          
            
            where: query
        })

        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
} )

productsRouter.get("/:id", async (req, res, next) => {
    try {
     
      const prod= await ProductModel.findByPk(req.params.id);
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


productsRouter.post("/", async (req, res, next) => {
    try {
      const prod = await ProductModel.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image:req.body.image,
      });

      if(prod.id) {
        const data = req.body.category.map((c) =>( {
          categoryId: categoryId,
          productId: prod.id
        }))
      }

      await ProductCategoryModel.bulkCreate(data)
  
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  productsRouter.put("/:id", async (req, res, next) => {
    try {
      const prod = await ProductModel.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(prod);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



  productsRouter.delete("/:id", async (req, res, next) => {
    try {
      const products = await ProductModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  productsRouter.post("/:productId/add/:categoryId", async (req, res, next) => {
    try {
      const result = await ProductCategoryModel.create({
        categoryId: req.params.categoryId,
        productId: req.params.productId,
      });
  
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default productsRouter