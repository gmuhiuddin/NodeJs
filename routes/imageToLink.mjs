import express from 'express';

const router = express.Router();

router.get('/:img', async (req, res) => {
    const { params: { img : file } } = req;
    console.log(file);
    const res = await imageConversion.compressAccurately(file,200)
    console.log(res);
});

export default router;