import express from "express";
import User from '../models/User.mjs';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const data = await User.find();

        res.send({ msg: 'user found successfully', data });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.get('/login/:email/:password', async (req, res) => {
    try {
        const data = await User.findOne({
            email: req.params.email,
            password: req.params.password
        });

        res.send({ msg: 'user found successfully', data });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.post('/signup', async (req, res) => {

    try {
        const data = await User.create({
            ...req.body
        });

        res.send({ msg: 'user added successfully', uid: data._id});

    } catch (err) {
        res.send({ msg: err.message });
    }
});

router.delete('/remove/:id', async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);

        res.send({ msg: 'user deleted successfully' });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

export default router;