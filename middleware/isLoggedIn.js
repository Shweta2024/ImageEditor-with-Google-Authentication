// middleware to check if the user has been authorized
// if authorized -> control flows to the next middleware(which gives access to the editor page)
// if unauthorized -> shows 'Unauthorized'
function isLoggedIn(req, res, next) {
    if (req.user){
        next()
    }
    else{
        // res.status(401).send('Unauthorized')
        res.redirect('/')
    }
}

module.exports = isLoggedIn
