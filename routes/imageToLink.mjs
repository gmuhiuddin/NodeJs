import express from 'express';
import base64Img from 'base64-img';

const router = express.Router();

function convertImageToUrl(imagePath) {
    return new Promise((resolve, reject) => {
      // Convert image to base64
      base64Img.base64(imagePath, (err, data) => {
        if (err) {
          reject(err); // Pass the error to the caller
        } else {
          // Create data URL
          const dataUrl = `data:image/png;base64,${data}`;
          resolve(dataUrl); // Resolve with the data URL
        }
      });
    });
  }

router.get('/', async (req, res) => {
    res.json({ msg: "image convert successfully" })
});

router.get('/:imagePath', async (req, res) => {

    const { params: { imagePath  } } = req;

    try {
        const url = await convertImageToUrl(`../../Desktop/Pictures/Saved Pictures${imagePath}`);
        
        res.send({ "msg": "file converted successfully", url})
    } catch (err) {
        res.send({ msg: err.message });
    };

});

export default router;