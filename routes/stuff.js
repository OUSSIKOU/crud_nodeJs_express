const express = require('express');
const parse = express();
const router = express.Router();
const auth = require('../middelware/auth');
const multer = require('../middelware/multer');
parse.use(express.json());
const controllersThings = require('../controllers/stuff')

router.post('/upload' , auth , multer ,controllersThings.createThing);

router.get('/:id', auth ,controllersThings.getThingById);

router.put('/:id', auth , multer , controllersThings.updateThing);

router.delete('/:id', auth , controllersThings.deleteThing );

router.get('/' +
  '', auth , controllersThings.getAllThings);

module.exports = router;