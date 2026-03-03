const express = require('express');
const router = express.Router();
const aiResumeController = require('../controllers/airesumeController');
const authorization = require('../middleware/authorization');

// All routes require authentication
router.use(authorization);

// Generate resume using AI
router.post('/generate', async (req, res) => {
  try {
    await aiResumeController.generateResume(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Analyze resume with job
router.post('/analyze', async (req, res) => {
  try {
    await aiResumeController.analyzeResume(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enhance resume section
router.post('/enhance', async (req, res) => {
  try {
    await aiResumeController.enhanceResume(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Suggest template
router.post('/suggest-template', async (req, res) => {
  try {
    await aiResumeController.suggestTemplate(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get agents status
router.get('/status', async (req, res) => {
  try {
    await aiResumeController.getAgentsStatus(req, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;