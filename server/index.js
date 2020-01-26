// MODULES
const express = require('express'),
      path = require('path'),
      cors = require('cors');

    // mongoDB
    //   connectDB = require('../config/db');
    //   connectDB();

require('dotenv').config();

// EXPRESS SERVER
const app = express();
const PORT = process.env.PORT || 5000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// MIDDLEWARE
app.use(cors());
app.use(express.static(DIST_DIR));
app.use(express.json({extended: false})); // sending post req
app.use(express.urlencoded({ extended: true }));

// DEFINE ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));

// AVAILABLE URL's
app.get('/api', (req, res) => {
    res.send(mockResponse);
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

// API
const mockResponse = {
    apo: `yammy yammy, i love api'es`
};

// LAUNCH SERVER ON PORT
app.listen(PORT, function () {
    console.log(`Server started on port: ${PORT}`);
});

