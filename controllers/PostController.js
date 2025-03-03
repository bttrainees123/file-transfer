const express = require('express');
const router = express.Router();
const postController = require('./PostController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), postController.createPost);
router.get('/getposts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', upload.single('image'), postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
