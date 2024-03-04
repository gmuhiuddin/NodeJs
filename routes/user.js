import express from "express";
import User from '../models/User.js';

const router = express.Router();

router.get('/login/:email/:password', async (req, res) => {
    try {

        const { params: { email, password } } = req;

        const data = await User.findOne({
            email
        });

        if (!data) {
            res.send({ msg: 'email not found!' });
            return;
        };

        const isCorrect = await data.comparePassword(password)

        isCorrect ?
            res.send({ msg: 'user found successfully', data }) :
            res.send({ msg: 'Incorrect password' });
        ;

    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.post('/signup', async (req, res) => {

    try {
        const data = await User.create({
            ...req.body
        });

        res.send({ msg: 'user added successfully', uid: data._id });

    } catch (err) {
        res.send({ msg: err.message });
    }
});

router.put('/updatepass/:email/:newPass', async (req, res) => {

    try {
        const { params: { email, newPass } } = req;

        const data = await User.findOne({
            email
        });

        const updatedPass = await data.updatePassword(newPass);

        await User.findByIdAndUpdate(data._id, {
            password: updatedPass
        })

        res.send({ msg: 'Password updated successfully' });

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