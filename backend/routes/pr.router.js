const express = require("express");
const router = express.Router();
const { createPR, getPRs, mergePR, closePR } = require("../controllers/prController");

router.post("/create", createPR);
router.get("/:repoId", getPRs);
router.post("/merge/:prId", mergePR);
router.patch("/close/:prId", closePR);

module.exports = router;