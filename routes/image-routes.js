const express = require("express");
const uploadImageController = require("../controllers/image-controller");
const authMiddleware = require('../middleware/auth-middleware');
const imageMiddleware = require("../middleware/upload-middleware")

const router = express.Router();

router.put('/uploadpp/:id', authMiddleware, imageMiddleware, uploadImageController);

module.exports = router;