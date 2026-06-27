const express = require("express");

const router = express.Router();

const aiController = require("../controllers/aiController");

router.get("/test", aiController.testAI);

router.post(
    "/commit-message",
    aiController.generateCommitMessage
);

router.post(

"/review",

aiController.reviewCode

);

router.post(
    "/generate-readme",
    aiController.generateReadme
);
module.exports = router;