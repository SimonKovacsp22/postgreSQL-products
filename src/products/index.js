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
          include:[ {
            model: CategoryModel,
            attributes:["name"],
            through:{attributes:[]}
          },{
            model: ReviewModel,
            attributes:["text","rating"]
          }],
           
            
          
            
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

  productsRouter.get("/:id/reviews", async (req, res, next) => {
    try {
     
      const reviews= await ReviewModel.findAll({
        where: {
          productId:{[Op.eq]:req.params.id} 
        }
      });
      res.send(reviews);
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
        const dataToInsert = req.body.category.map((cId) =>( {
          categoryId: cId,
          productId: prod.id
        }))
        await ProductCategoryModel.bulkCreate(dataToInsert)
      }

      
  
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
          productId: req.params.productId
      });
  
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  productsRouter.delete("/:productId/remove/:categoryId", async (req, res, next) => {
    try {
      const instances = await ProductCategoryModel.destroy({
        where:{
          categoryId: req.params.categoryId,
          productId: req.params.productId,}
        
      });
  
      res.send({rows: instances});
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


export default productsRouter