const express = require('express');
const router = express.Router();
const backlogs = require('../controller/backlogs');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(backlogs.index)
    .post(backlogs.createBacklog)

router.route('/:id')
    .get(backlogs.getBacklogs)
    .delete(backlogs.deleteBacklog)
    .put(backlogs.editBacklog)
    .post(upload.single("file"), backlogs.addItem)

router.route(':id/items')
    .put(backlogs.editItems)

router.route('/:bid/items/:iid/edit')
    .get(backlogs.showItemEdit)

router.route('/:bid/items/:iid')
    .put(upload.single("file"), backlogs.editItem)
    .delete(backlogs.deleteItem)

module.exports = router;