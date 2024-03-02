import express from 'express';
import products from './products.mjs';
import productId from './productId.mjs';
import user from './user.mjs';
import UserInfo from './userInfo.mjs';
import imgToUrl from './imageToLink.mjs';

const router = express.Router();

router.use('/products', products);
router.use('/productid', productId);
router.use('/imgtourl', imgToUrl);
router.use('/user', user);
router.use('/userinfo', UserInfo);

export default router;