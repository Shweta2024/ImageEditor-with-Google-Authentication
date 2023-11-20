const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Image = require('../model/Image')
const multer = require('multer')
const path = require('path')


// configure multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/editor', upload.single('image') , async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.')
    }

    // get the image uploaded by user and save it in db
    const newImage = new Image()
    newImage.name = req.file.originalname
    newImage.data = req.file.buffer
    newImage.contentType = req.file.mimetype
    await newImage.save();
})


// get all the images from db and display them
router.get('/gallery', async (req, res) => {
    const images = await Image.find()
    res.render('images', { images })

})


// successfull redirect to editor route 
router.get('/editor', (req, res) => {
    res.render('editor')
})


module.exports = router