const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

const Hospital = require('../models/Hospital');

// @route GET api/hospitals
// @desc Get all users hospitals
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const hospitals = await Hospital.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(hospitals);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error'
    });
  }
});

// @route POST api/hospitals
// @desc Create a hospital
// @access Public
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name } = req.body;

    try {
      const newHospital = new Hospital({
        name,
        user: req.user.id
      });

      const hospital = await newHospital.save();
      res.json(hospital);
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
