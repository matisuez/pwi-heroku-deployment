const {Router} = require('express');
const router = new Router();
const multer = require('multer');
const config = { dest: './public/tmp' }; // Guardado temporal
const upload = multer(config);

const { 
    getUsers,
    getFormUser,
    createFormUser 
} = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', getUsers);
router.get('/new', getFormUser);
router.post('/new', upload.single('image'), createFormUser); // middleware que lee el input con name "image"

module.exports = router;
