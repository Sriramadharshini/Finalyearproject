const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = new authController();
const generatePrefToken = require('../middleware/preftoken');
const authorization = require('../middleware/authorization');
const bodyParser = require('body-parser');
const User = require('../models/user');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcryptjs');
router.post('/register', async (req, res) => {
  try {
    const { Fullname, EmailAddress, Password, PhoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    await User.create({
  Fullname,
  EmailAddress,
  Password: hashedPassword,
  PhoneNumber
});
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("Register error:", error.message);
    res.status(400).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    console.log('Login request body', req.body);

    const result = await auth.login(req.body);

    const tokenResult = await generatePrefToken(result);

    if (!tokenResult) {
      return res.status(500).json({
        message: 'Token generation failed'
      });
    }

    res.setHeader("token", `Bearer ${tokenResult.token}`);

    res.status(200).json({
      message: 'Login successful',
      token: tokenResult.token,
      data: result
    });

  } catch (error) {
    console.error('Login failed:', error.message);

  
    res.status(401).json({
      message: error.message
    });
  }
});


// router.post('/login', async (req, res) => {
//   try {
//     console.log('Frontend request body:', req.body); // 🔥 check what backend receives

//     if (!req.body) {
//       return res.status(400).json({ message: "No body received" });
//     }

//     const { EmailAddress, Password } = req.body;

//     console.log('Email:', EmailAddress, 'Password:', Password);

//     const user = await User.findOne({ EmailAddress });
//     console.log('User found in DB:', user);

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(Password, user.Password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Token generation
//     const tokenResult = await generatePrefToken(user);

//     res.status(200).json({
//       message: 'Login successful',
//       token: tokenResult.token,
//       data: user
//     });
//   } catch (error) {
//     console.error('Login failed:', error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

router.post('/logout',async (req, res) => {
try {
    const result = await auth.logout(req.body);
    res.status(200).json({
        message:'logout successfully',
        data:result
    });
} catch (error) {
    res.status(400).json({
    error: error.message
    });
}
});


module.exports = router;



