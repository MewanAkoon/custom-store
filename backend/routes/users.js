const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, validate, validateUpdatedUser } = require('../models/users');

// Gets all the users in the database
router.get('/', async (req, res) => {
  try {
    let users = await User.find();
    if (users.length === 0) return res.status(404).send('No users in the database...');
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a users when email is specified
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found...');
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Creates a new user
// Need firstName, lastName, email, phone, address passed via body
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const body = { ...req.body };
    body.password = hashedPassword;

    const user = new User(body);
    await user.save();
    res.send(body);
  } catch (err) {
    if (err.code === 11000) return res.status(400).send('User Already Exists');
    res.status(400).send(err);
  }
});

// logs in a user
router.post('/:email/:password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).send('User not found...');

    // checks if the passwords are matching
    if (!await bcrypt.compare(req.params.password, user.password))
      return res.status(400).send('Not allowed');

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Updates a user
router.patch('/:id', async (req, res) => {
  const { error } = validateUpdatedUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Deletes a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted...');
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;