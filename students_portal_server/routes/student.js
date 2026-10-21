const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const { verifyToken, isAdmin } = require('../middleware/authmiddleware');

router.get('/', verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select('-password');

  res.json(users);
});

router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const student = await User.create({ name, email, password: hashed, role: 'student' });

  res.status(201).json(student);
});
 
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  const { name, email } = req.body;

  const student = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  ).select('-password');
 
  res.json(student);
});
 
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
 
  res.status(204).send();
});
 
// DASHBOARD //
 
router.get('/me', verifyToken, async (req, res) => {
  const me = await User.findById(req.user.id).select('-password');
 
  res.json(me);
});
 
module.exports = router;