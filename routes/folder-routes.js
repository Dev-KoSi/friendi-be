const express = require("express");

const {saveToFolder, getFiles, deleteFile} = require("../controllers/folder-ctrl")
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/savefile', authMiddleware, saveToFolder);
router.post('/getfiles', getFiles);
router.delete('/delete/:id', authMiddleware, deleteFile);

module.exports = router;