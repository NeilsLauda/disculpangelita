const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'public', 'images') });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/images', (req, res) => {
  const dir = path.join(__dirname, 'public', 'images');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list images' });
    const images = files.filter(f => /\.(png|jpe?g|gif)$/i.test(f));
    res.json({ images });
  });
});

app.post('/api/images', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const ext = path.extname(req.file.originalname);
  const newName = `${req.file.filename}${ext}`;
  const newPath = path.join(req.file.destination, newName);
  fs.rename(req.file.path, newPath, err => {
    if (err) return res.status(500).json({ error: 'Failed to save image' });
    res.status(201).json({ message: 'Image uploaded', file: newName });
  });
});

app.delete('/api/images/:name', (req, res) => {
  const file = path.join(__dirname, 'public', 'images', req.params.name);
  fs.unlink(file, err => {
    if (err) {
      if (err.code === 'ENOENT') return res.status(404).json({ error: 'Image not found' });
      return res.status(500).json({ error: 'Failed to delete image' });
    }
    res.json({ message: 'Image deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
