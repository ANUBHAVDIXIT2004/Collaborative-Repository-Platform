const express = require("express");
const router = express.Router();

const {
    createCommit,
    getCommits,
    resetRepository
} = require("../controllers/commitController");

router.post("/create", createCommit);

router.get("/:repoId", getCommits);

router.post("/reset/:commitId", resetRepository);

module.exports = router;