const Commit = require("../models/commitModel");
const Repository = require("../models/repoModel");
const File = require("../models/File");

const createCommit = async (req, res) => {
    try {

        // Get all files of this repository
        const files = await File.find({
            repo: req.body.repoId
        });

        // Create snapshot
        const snapshot = files.map(file => ({
            name: file.name,
            content: file.content
        }));

        // Create commit
        const commit = await Commit.create({

            repo: req.body.repoId,

            author: req.body.userId,

            message: req.body.message,

            action: req.body.action,

            fileName: req.body.fileName,

            snapshot

        });

        // Update repository HEAD
        await Repository.findByIdAndUpdate(
            req.body.repoId,
            {
                headCommit: commit._id
            }
        );

        res.status(201).json(commit);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const getCommits = async (req, res) => {

    try {

        const commits = await Commit.find({

            repo: req.params.repoId

        })
        .populate("author", "username")
        .sort({ createdAt: -1 });

        res.json(commits);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const resetRepository = async (req, res) => {

    try {

        const { commitId } = req.params;
        const { userId } = req.body;

        // Find selected commit
        const commit = await Commit.findById(commitId);

        if (!commit) {

            return res.status(404).json({

                success: false,

                message: "Commit not found"

            });

        }

        // Find repository
        const repo = await Repository.findById(commit.repo);

        if (!repo) {

            return res.status(404).json({

                success: false,

                message: "Repository not found"

            });

        }

        // Save current HEAD before changing anything
        const previousHead = repo.headCommit;

        // Current repository files
        const currentFiles = await File.find({

            repo: repo._id

        });

        const snapshot = commit.snapshot;

        // Delete files that should not exist
        for (const file of currentFiles) {

            const exists = snapshot.find(f => f.name === file.name);

            if (!exists) {

                await File.findByIdAndDelete(file._id);

            }

        }

        // Restore files
        for (const snapFile of snapshot) {

            const existingFile = await File.findOne({

                repo: repo._id,

                name: snapFile.name

            });

            if (existingFile) {

                existingFile.content = snapFile.content;

                await existingFile.save();

            } else {

                await File.create({

                    repo: repo._id,

                    name: snapFile.name,

                    content: snapFile.content,

                    createdBy: userId

                });

            }

        }

        // Create RESET commit
        const resetCommit = await Commit.create({

            repo: repo._id,

            parentCommit: previousHead,

            author: userId,

            message: `Reset to "${commit.message}"`,

            action: "RESET",

            fileName: "Repository",

            snapshot

        });

        // Move HEAD to RESET commit
        repo.headCommit = resetCommit._id;

        await repo.save();

        return res.status(200).json({

            success: true,

            message: "Repository restored successfully",

            commit: resetCommit

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    createCommit,

    getCommits,

    resetRepository

};