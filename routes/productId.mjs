import express from 'express';
import ProductId from '../models/ProductId.mjs';

const router = express.Router();

router.get('/:newId', async (req, res) => {
    try {
        await ProductId.findByIdAndUpdate('65da2a0185f19ee977ccb69e', {
            productId: req.params.newId
        });

        res.send({ msg: 'Product id updated successully' });
    } catch (err) {
        res.send({ msg: err.message })
    };
});

export default router;
