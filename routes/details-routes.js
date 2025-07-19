const express = require("express");

const {addDetails, retrieveDetails, addId} = require('../controllers/details-ctrl');

const router = express.Router();

router.put('/:id/adddetails', addDetails);
router.post('/retrieve', retrieveDetails);
router.put('/:id/id', addId);

module.exports = router;