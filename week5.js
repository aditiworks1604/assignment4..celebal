const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cruddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Create Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

// CREATE
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.json(savedUser);
});

// READ
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server started at http://localhost:3000");
});
