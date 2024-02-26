import express from 'express';
import Ads from '../models/Ads.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await Ads.find();

    res.send({ msg: 'Products fetched successully', data: result })
});

router.get('/:id', async (req, res) => {
    const result = await Ads.findById(req.params.id);

    res.send({ msg: 'Single product fetched successully', data: result })
});

router.get('/search/:search', async (req, res) => {

    const result = await Ads.find({title: req.params.search});

    res.send({ msg: 'Products fetched successully', data: result})
});

router.post('/post', async (req, res) => {

    const ad = new Ads(req.body);
    await ad.save();

    res.send({ msg: 'Products added successully' })
});

router.put('/put/:id', async (req, res) => {
    await Ads.findByIdAndUpdate(req.params.id ,req.body);

    res.send({ msg: 'Products updated successully' })
});

router.delete('/remove/:id', async (req, res) => {
    await Ads.findByIdAndDelete(req.params.id);

    res.send({ msg: 'Products deleted successully' })
});

export default router;
