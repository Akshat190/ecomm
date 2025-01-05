import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, createProductReview, getRelatedProducts } from '../controllers/productController.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/related').get(getRelatedProducts);

export default router;