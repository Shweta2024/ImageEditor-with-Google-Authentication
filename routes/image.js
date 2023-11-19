const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Image = require('../model/Image')


router.post('/editor', isLoggedIn, async (req, res) => {

    // get the image uploaded by user and save it in db
    const newImage = new Image({
        name: req.file.originalname,
        data: buffer,
        contentType: mimetype,
    });
    await newImage.save();
})


// get all the images from db and display them
router.get('/gallery', isLoggedIn , async (req, res) => {
    const images = await Image.find()
    res.render('images', { images });

})


// successfull redirect to editor route 
router.get('/editor', isLoggedIn, (req, res) => {
    res.render('editor')
})


module.exports = router