const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('../schema/User');

// bcrypt to hash the pw
// config the cookie to httpOnly and Secure and expire on 3 days
// ??? No Session Fixation Vulnerabilities (rotate session id upon successful login) 

const UserSalt = bcrypt.genSaltSync(10)

router.post('/register', async(req, res) => {
    // if (req.csrfToken() !== req.body._csrf) {
    //     return res.status(403).send('Invalid CSRF token');
    // }
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({ msg: "Invalid email or username or password" });
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
        return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, UserSalt);
    const newUser = await UserModel.create({
        email: email,
        username: username,
        password: hashedPassword
    });
    return res.status(200).json(newUser);
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const isExistUser = await UserModel.findOne({ email: email });
    if (!isExistUser) {
        return res.status(400).json({ msg: "User does not exist" })
    }
    try {
        const isPasswordCorrect = await bcrypt.compare(password, isExistUser.password)
        if(!isPasswordCorrect) {
            return res.status(401).json({ error
                : 'Invalid username or password' });
        }

        const csrfToken = req.csrfToken();
        res.cookie('auth', csrfToken, {
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
        });
        
        return res.status(200).json({ msg: "Login success" });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
})


router.post('/change_password', async(req, res) => {
    
})


router.get('/get_csrfToken', async(req, res) => {
    res.json({ csrfToken: req.csrfToken() });
})

module.exports = router;