const express = require('express');
const app = express();

// Set up middleware
app.use(express.json());

// Define routes
// ...

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/touristic-site-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a picture schema
const pictureSchema = new mongoose.Schema({
  title: String,
  url: String,
});

// Create a picture model
const Picture = mongoose.model('Picture', pictureSchema);

// Define the route to fetch touristic site pictures
app.get('/api/pictures', async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
