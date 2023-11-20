const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Image = require('../model/Image')
const multer = require('multer')
const path = require('path')


// configure multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/editor', isLoggedIn, upload.single('image') , async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.')
    }

    // get the image uploaded by user and save it in db
    const newImage = new Image()
    newImage.name = req.file.originalname
    newImage.data = req.file.buffer
    newImage.contentType = req.file.mimetype
    await newImage.save();
    res.redirect('/image/gallery')
    // res.render('editor',
    //     { text: `${newImage.name} successfully saved to Gallery! Click on 'Image Gallery to view all the images.'` })
})


// get all the images from db and display them
router.get('/gallery', isLoggedIn, async (req, res) => {
    const images = await Image.find()
    res.render('images', { images })

})


// successfull redirect to editor route 
router.get('/editor', isLoggedIn, (req, res) => {
    res.render('editor', { text: '' })
})


module.exports = router