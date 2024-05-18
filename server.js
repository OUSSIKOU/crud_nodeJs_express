const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('server.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const stuffRoutes = require('./routes/stuff');
debug.log = console.log.bind(console); // This line enables printing to the console
dotenv.config();

// db

const MONGODB_URI = process.env.MONGODB_URI; // You can store the MongoDB URI in an environment variable

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log(`connect to ${MONGODB_URI}`);
});

// disconnect from db
process.on('SIGINT', () => {
  mongoose.disconnect(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

// secure : CORS signifie « Cross Origin Resource Sharing ».
//Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//bodyparser
app.use(express.json());

// stores the images uploaded by multer in images folder ;
app.use('/images', express.static(path.join(__dirname, 'images')));

// Méthodes de routage
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stuff', stuffRoutes);

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('--');
  debug(chalk.green(`PORT APP:\t\t\t${port}`));
  debug(chalk.red(`Database:\t\t\t${process.env.MONGODB_URI}`));
  debug('--');
  console.log(`server is running on ${port}`);
});
