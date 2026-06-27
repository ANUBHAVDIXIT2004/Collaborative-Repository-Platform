const File = require("../models/File");
const Repository = require("../models/repoModel");
const VersionControl = require("../services/VersionControl");

const createFile = async (req, res) => {
    try {

        const { repoId, name, content, userId } = req.body;

        // Check if repository exists
        const repo = await Repository.findById(repoId);

        if (!repo) {
            return res.status(404).json({
                message: "Repository not found"
            });
        }

        // Only owner can create files
        if (repo.owner.toString() !== userId) {
            return res.status(403).json({
                message: "You are not allowed to modify this repository"
            });
        }

        // Prevent duplicate filenames
        const existingFile = await File.findOne({
            repo: repoId,
            name: name
        });

        if (existingFile) {
            return res.status(400).json({
                message: "File already exists"
            });
        }

        const file = await File.create({
            repo: repoId,
            name,
            content,
            createdBy: userId
        });


        const commit = await VersionControl.commit({

            repoId,

            userId,

            message: req.body.commitMessage,

            action: "ADD",

            fileName: name

        });


        res.status(201).json(file);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getFiles = async (req, res) => {

    try {

        const files = await File.find({
            repo: req.params.repoId
        });

        res.json(files);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

const getFileById = async (req, res) => {
    try {

        const file = await File.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        res.json(file);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteFile = async (req, res) => {
    try {

        const { fileId } = req.params;
        const { userId } = req.body;

        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        const repo = await Repository.findById(file.repo);

        if (!repo) {
            return res.status(404).json({
                message: "Repository not found"
            });
        }

        if (repo.owner.toString() !== userId) {
            return res.status(403).json({
                message: "You are not allowed to delete this file"
            });
        }


        const commit = await VersionControl.commit({

            repoId: repo._id,

            userId,

            message: req.body.commitMessage,

            action: "DELETE",

            fileName: file.name

        });

        await File.findByIdAndDelete(fileId);

        res.json({
            message: "File deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const editFile = async (req, res) => {

    try {

        const { fileId } = req.params;

        const {
            content,
            userId,
            commitMessage
        } = req.body;

        const file = await File.findById(fileId);

        if (!file) {

            return res.status(404).json({
                message: "File not found"
            });

        }

        const repo = await Repository.findById(file.repo);

        if (!repo) {

            return res.status(404).json({
                message: "Repository not found"
            });

        }

        if (repo.owner.toString() !== userId) {

            return res.status(403).json({
                message: "Only owner can edit"
            });

        }

        file.content = content;

        await file.save();


        const commit = await VersionControl.commit({

            repoId: repo._id,

            userId,

            message: commitMessage,

            action: "EDIT",

            fileName: file.name

        });



        res.json({

            message: "File updated",

            file

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {
    createFile,
    getFiles,
    getFileById,
    deleteFile,
    editFile
};