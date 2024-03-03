import express from 'express';


const router = express.Router();

router.get('/', async (req, res) => {
    // const { params: { file : img } } = req;
    // console.log(file);
    // const data = await imageConversion.compressAccurately(file,200);

    // console.log(data);

    res.json({ msg: "image convert successfully" })
});

router.get('/:img', async (req, res) => {

    const { params: { img: file } } = req;

    try {

        res.send({ "msg": "file converted successfully", file: file })
    } catch (err) {
        res.send({ msg: err.message });
    };

});

export default router;