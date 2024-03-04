import express from "express";
import UserInfo from '../models/UserInfo.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const data = await UserInfo.findById(req.params.id);

        data ?
            res.send({ msg: 'user info found successfully', data })
            :
            res.send({ msg: 'Data not found' });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.post('/post', async (req, res) => {
    try {
        const data = await UserInfo.create(req.body);

        res.send({ msg: 'user found successfully', data });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.put('/put/:id', async (req, res) => {
    try {
        await UserInfo.findByIdAndUpdate(req.params.id, req.body);

        res.send({ msg: 'user updated successfully' });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

export default router;