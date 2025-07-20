const express = require("express");

const {addDetails, retrieveDetails, changeId} = require('../controllers/details-ctrl');

const router = express.Router();

router.put('/:id/adddetails', addDetails);
router.post('/retrieve', retrieveDetails);
router.put('/:id/id', changeId);

module.exports = router;