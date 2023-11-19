const router = require('express').Router()
const session = require('express-session')
const isLoggedIn = require('../middleware/isLoggedIn')
const multer = require('multer')
const Image = require('../model/Image')

// render the login page with functionality to login with google
router.get('/', (req, res) => {
    res.render('index')
})


// handle the logout funtionality 
// destory session and redirect to login page(i.e. root route)
router.get('/logout', (req, res) => {
    req.logOut(function (err) {
        if (err) {
            console.log(err)
        }
        req.session.destroy(() => {
            res.redirect('/')
        })
    })
})

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/image/upload', upload.single('image'), (req, res) => {
    const newImage = new Image();
    newImage.name = req.file.originalname;
    newImage.data = req.file.buffer;
    newImage.contentType = req.file.mimetype;

    newImage.save();
    res.redirect('/image/gallery')
});

router.get('/image/gallery', async (req, res) => {
    const images = await Image.find()
    res.render('images', { images });
    
})

// successfull redirect to editor route 
router.get('/image/editor', isLoggedIn, (req, res) => {
    res.render('editor')
})

module.exports = router
