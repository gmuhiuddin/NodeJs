import express from "express";
import UserInfo from '../models/UserInfo.mjs';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const data = await UserInfo.find();

        res.send({ msg: 'user found successfully', data });
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const data = await UserInfo.findById(req.params.id);

data ?
res.send({ msg: 'user info found successfully', data })
:
res.send( {msg: 'Data not found'} );
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
        await UserInfo.findByIdAndUpdate(req.params.id ,req.body);

        res.send({ msg: 'user updated successfully'});
    } catch (err) {
        res.send({ msg: err.message });
    }

});

// router.post('/signup', async (req, res) => {

//     try {
//         const data = await UserInfo.create({
//             ...req.body
//         });

//         res.send({ msg: 'user added successfully', uid: data._id});

//     } catch (err) {
//         res.send({ msg: err.message });
//     }
// });

// router.delete('/remove/:id', async (req, res) => {

//     try {
//         await UserInfo.findByIdAndDelete(req.params.id);

//         res.send({ msg: 'user deleted successfully' });
//     } catch (err) {
//         res.send({ msg: err.message });
//     }

// });

export default router;