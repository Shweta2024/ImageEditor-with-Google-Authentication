const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const multer = require('multer')
const Image = require('../model/Image')
const sharp = require('sharp')


// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), async (req, res) => {
    // const newImage = new Image();
    // newImage.name = req.file.originalname;
    // newImage.data = req.file.buffer;
    // newImage.contentType = req.file.mimetype;

    // await newImage.save();
    // res.redirect('/image/gallery')
    try {
        const { buffer, mimetype } = req.file;
        const { cropX, cropY, cropWidth, cropHeight } = req.body; // Values sent from the frontend

        // Use sharp to crop the image based on user-selected coordinates
        const croppedImageBuffer = await sharp(buffer)
            .extract({ width: cropWidth, height: cropHeight, left: cropX, top: cropY })
            .toBuffer();

        const newImage = new Image({
            name: req.file.originalname,
            data: croppedImageBuffer,
            contentType: mimetype,
        });

        await newImage.save();
        res.redirect('/gallery')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing image');
    }
})


router.get('/gallery', isLoggedIn, async (req, res) => {
    const images = await Image.find()
    res.render('images', { images });

})


// successfull redirect to editor route 
router.get('/editor', isLoggedIn, (req, res) => {
    res.render('editor')
})


module.exports = router