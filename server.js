const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 20017;

app.use(express.static(path.join(__dirname, 'src')));

app.use('/media', express.static(path.join(__dirname, 'media')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Moody Chimi server is running on http://localhost:${PORT}`);
});
