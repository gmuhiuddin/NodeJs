import express from 'express';
import imageConversion from 'image-conversion';

const router = express.Router();

router.get('/', async (req, res) => {
    // const { params: { file : img } } = req;
    // console.log(file);
    // const data = await imageConversion.compressAccurately(file,200);

    // console.log(data);

    res.json({ msg: "image convert successfully" })
});

router.get('/:img', async (req, res) => {
    
    try {
        const { params: { img: file } } = req;

        const data = await imageConversion.compressAccurately(file, 200);

        res.json({ msg: "image convert successfully", url: data });
    } catch (err) {
        res.json({ msg: err.message });
    }
});

export default router;