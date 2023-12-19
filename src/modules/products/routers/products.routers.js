// const router = require('express').Router()
// const {getAllProducts,searchProduct,addProduct,updateProduct,deleteProduct} = require('../controllers/products.controllers')
import { Router } from 'express'
import {
  getAllProducts,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controllers.js";

const router = Router()
//===============================
//products end points
//===============================
router.get('/products', getAllProducts)

router.get('/product', searchProduct)

router.post("/addProduct", addProduct);

router.put('/updateProduct/:id',updateProduct)

router.delete('/deleteProduct/:id',deleteProduct)

export default router;