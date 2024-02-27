import express from 'express';
import products from './products.mjs';
import user from './user.mjs';
import UserInfo from './userInfo.mjs';

const router = express.Router();

router.use('/products', products);
router.use('/user', user);
router.use('/userinfo', UserInfo);

export default router;