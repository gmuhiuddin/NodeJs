import express from 'express';
import Ads from '../models/Ads.js';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const result = await Ads.find();

        res.send({ msg: 'Products fetched successully', data: result });

    } catch (err) {
        res.send({ msg: err.message })
    };
});

router.get('/:id', async (req, res) => {

    try {
        const result = await Ads.findById(req.params.id);

        res.send({ msg: 'Single product fetched successully', data: result })
    } catch (err) {
        res.send({ msg: err.message })
    };
});

router.get('/search/:search', async (req, res) => {
    try {
        const result = await Ads.find({ title: req.params.search });

        res.send({ msg: 'Products fetched successully', data: result })
    } catch (err) {
        res.send({ msg: err.message })
    };
});

router.post('/post', async (req, res) => {

    try {
        //Two ways to add the product in Db

        //1 way

        // await Ads.create(req.body);

        //2 way

        const ad = new Ads(req.body);
        await ad.save();

        res.send({ msg: 'Products added successully' });
    } catch (err) {
        res.send({ msg: err.message })
    };
});

router.put('/put/:id', async (req, res) => {
    try {
        await Ads.findByIdAndUpdate(req.params.id, req.body);

        res.send({ msg: 'Products updated successully' });
    } catch (err) {
        res.send({ msg: err.message })
    };
});

router.delete('/remove/:id', async (req, res) => {

    try {
        await Ads.findByIdAndDelete(req.params.id);

        res.send({ msg: 'Products deleted successully' })

    } catch (err) {
        res.send({ msg: err.message })
    };
});

export default router;
