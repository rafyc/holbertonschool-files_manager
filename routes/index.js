import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();


router.get('/status', async (req, res) => {
  try {
    const result = await AppController.getStatus();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error while getting status:", error);
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while getting status."
    });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const result = await AppController.getStats();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error while getting stats:", error);
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while getting statistics."
    });
  }
});

module.exports = router;
