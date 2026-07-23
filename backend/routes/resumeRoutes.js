const express = require('express');
const router = express.Router();
const { trackDownload, getDownloads } = require('../controllers/resumeController');

router.post('/download', trackDownload);
router.get('/downloads', getDownloads);

module.exports = router;
