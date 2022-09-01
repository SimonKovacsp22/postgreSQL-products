import express from 'express'
import ReviewModel from '../reviews/model.js'
import sequelize from '../db/index.js'
import UserModel from "../users/model.js"

const reviewRouter = express.Router()

reviewRouter.get('/', async (req,res,next) => {
    try {
    
        
        const reviews = await ReviewModel.findAll({
            include: UserModel
        })
       

        res.send(reviews)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
} )

reviewRouter.get("/:id", async (req, res, next) => {
    try {
     
      const review= await ReviewModel.findByPk(req.params.id);
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


reviewRouter.post("/", async (req, res, next) => {
    try {
      const review = await ReviewModel.create(req.body);
  
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  reviewRouter.put("/:id", async (req, res, next) => {
    try {
      const review = await ReviewModel.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



  reviewRouter.delete("/:id", async (req, res, next) => {
    try {
      const reviews = await ReviewModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows: reviews });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  export default reviewRouter