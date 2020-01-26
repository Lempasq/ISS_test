const router = require('express').Router()
const User = require('../models/user.model')
const gravatar = require('gravatar')
const {registerValidation} = require('../validation/user.validation')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

// @route  GET api/users/...
// @desc   Register User
// @access Public
router.post('/', async (req, res) => {
    // Validation
    const {error, value} = registerValidation(req.body)
    if (error) return res.status(400).json(error)

    const {name, email, password} = value

    try {
        // isUnique
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json("User already exist")
        }

        // Get users gravata
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrypt passwordrs
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
