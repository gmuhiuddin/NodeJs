import express from 'express';
import ProductId from '../models/ProductId.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await ProductId.findById('65da2a0185f19ee977ccb69e');

        res.send({ msg: 'Product id fetched successully', data: result });

    } catch (err) {
        res.send({ msg: err.message })
    };
});

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
