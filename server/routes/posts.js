const router = require('express').Router()
const User = require('../models/user.model')

// @route  GET api/posts/...
// @desc
// @access Public
router.get('/', async (req, res) => {
    res.send('Posts route')
})

module.exports = router;
