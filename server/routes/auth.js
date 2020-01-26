const router = require('express').Router()
const User = require('../models/user.model')
const auth = require('./verifyToken')
const {loginValidation} = require('../validation/user.validation')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

// @route  GET api/auth/...
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User
            .findById(req.user.id)
            .select("-password")
        res.json(user)
    } catch (e) {
        res.status(500).json('Server error...')
    }
})

// @route  POST api/auth/...
// @desc   Authenicate user & get token
// @access Public
router.post('/', async (req, res) => {

    // Validation
    const {error, value} = loginValidation(req.body)
    if (error) return res.status(400).json(error)

    const {email, password} = value

    try {
        // isUnique
        let user = await User.findOne({ email })
        if (!user) return res
                .status(400)
                .json("Invalid Credentials")

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if(!isMatch) return res
            .status(400)
            .json("Invalid Credentials")

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwToken'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        )
    } catch (e) {
        console.log(e)
        return res.status(500).send("Server error")
    }
})

module.exports = router;
