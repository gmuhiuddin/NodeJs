import express from 'express';
import products from './products.mjs';

const router = express.Router();

router.use('/products', products);

export default router;