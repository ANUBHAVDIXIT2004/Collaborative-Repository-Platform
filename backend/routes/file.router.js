const express = require("express");
const router = express.Router();

const {
    createFile,
    getFiles
} = require("../controllers/file.controller");

router.post("/create", createFile);
router.get("/:repoId", getFiles);

module.exports = router;