const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'Please enter a Name, is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server Error'
      });
    }
  }
);

// @route PUT api/users/:id
// @desc update user
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, role } = req.body;

  //Build a contact object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (role) userFields.role = role;

  try {
    let user = await User.findById(req.params.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Make sure user is authorized
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error'
    });
  }
});

// @route DELETE api/users/:id
// @desc Delete user
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Make sure user is authorized
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error'
    });
  }
});

module.exports = router;
