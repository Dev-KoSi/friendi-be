const express = require("express");

const {saveToFriends, getFriends, deleteFriend} = require("../controllers/folder-ctrl")
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/savefile', authMiddleware, saveToFriends);
router.post('/getfiles', getFriends);
router.delete('/delete/:id', authMiddleware, deleteFriend);

module.exports = router;