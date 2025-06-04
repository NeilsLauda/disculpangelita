const express = require('express');
const fs = require('fs');
const path = require('path');

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
