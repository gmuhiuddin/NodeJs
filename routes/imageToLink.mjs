import express from 'express';
import imageConversion from 'image-conversion'

const router = express.Router();

router.get('/:img', async (req, res) => {
    const { params: { file : img } } = req;
    console.log(file);
    const data = await imageConversion.compressAccurately(file,200);

    console.log(data);

    res.json({msg: "image convert successfully", url: data})
});

export default router;