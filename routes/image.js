const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const multer = require('multer')
const Image = require('../model/Image')


// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), async (req, res) => {
    const newImage = new Image();
    newImage.name = req.file.originalname;
    newImage.data = req.file.buffer;
    newImage.contentType = req.file.mimetype;

    await newImage.save();
    res.redirect('/image/gallery')
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