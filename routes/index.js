import express from 'express';
import products from './products.js';
import productId from './productId.js';
import user from './user.js';
import userInfo from './userInfo.js';

const router = express.Router();

router.use('/products', products);
router.use('/productid', productId);
router.use('/user', user);
router.use('/userinfo', userInfo);

export default router;