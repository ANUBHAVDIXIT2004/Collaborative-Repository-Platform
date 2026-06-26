const express = require("express");
const router = express.Router();

const {
    createFile,
    getFiles,
    getFileById,
    deleteFile
} = require("../controllers/fileController");

router.post("/create", createFile);

router.get("/view/:fileId", getFileById);

router.get("/:repoId", getFiles);

router.delete("/:fileId", deleteFile);

module.exports = router;