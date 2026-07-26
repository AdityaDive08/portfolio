const express = require('express');
const router = express.Router();
const { trackDownload } = require('../controllers/resumeController');

router.post('/download', trackDownload);

module.exports = router;
