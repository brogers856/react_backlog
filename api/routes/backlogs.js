const express = require('express');
const router = express.Router();
const backlogs = require('../controller/backlogs');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, isOwner, isItemOwner } = require('../middleware')
const catchAsync = require('../utils/catchAsync')

router.route('/')
    .get(isLoggedIn, catchAsync(backlogs.index))
    .post(isLoggedIn, catchAsync(backlogs.createBacklog))

router.route('/:id')
    .get(isLoggedIn,  catchAsync(isOwner), catchAsync(backlogs.getBacklogs))
    .delete(isLoggedIn, catchAsync(isOwner), catchAsync(backlogs.deleteBacklog))
    .put(isLoggedIn, catchAsync(isOwner), catchAsync(backlogs.editBacklog))
    .post(isLoggedIn, catchAsync(isOwner), upload.single("file"), catchAsync(backlogs.addItem))

router.route('/:id/items')
    .put(isLoggedIn, catchAsync(isOwner), catchAsync(backlogs.editItems))

router.route('/:bid/items/:iid')
    .put(isLoggedIn, catchAsync(isItemOwner), upload.single("file"), catchAsync(backlogs.editItem))
    .delete(isLoggedIn, catchAsync(isItemOwner), catchAsync(backlogs.deleteItem))

module.exports = router;