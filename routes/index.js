const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const { Login, Register, Auth} = require('../controllers/auth');

const { getalluser, deleteuser,editsubs } = require('../controllers/user');

const {  postartis, getallartis } = require('../controllers/artist');

const { getallmusic, getonemusic, postmusic } = require('../controllers/music');

const { addTransaction, getTransaction, editTransaction} = require('../controllers/transaction');

// Authentication Routes
router.post('/register', Register);
router.post('/login', Login);
router.get('/auth', auth, Auth);

// User Routes
router.get('/user', auth, getalluser);
router.delete('/user/:id', auth, deleteuser);
router.patch('/user/:id',  editsubs);

// Artist Routes
router.post('/artis',  postartis);
router.get('/artis', getallartis);

// Music Routes
router.get('/music', getallmusic);
router.get('/music/:title', auth, getonemusic);
router.post('/music', auth, postmusic);

// Transcation Routes
router.get('/transaction', getTransaction);
router.post('/transaction', addTransaction);
router.patch('/transaction/:id', auth, editTransaction);


module.exports = router;
