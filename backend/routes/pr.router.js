const express = require("express");
const router = express.Router();
const { createPR, getPRs, mergePR, closePR, getPRDiff} = require("../controllers/prController");

router.post("/create", createPR);
router.get("/:repoId", getPRs);
router.post("/merge/:prId", mergePR);
router.patch("/close/:prId", closePR);
router.get("/diff/:prId", getPRDiff);
module.exports = router;