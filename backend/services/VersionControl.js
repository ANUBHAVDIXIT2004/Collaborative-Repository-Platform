const Commit = require("../models/commitModel");
const Repository = require("../models/repoModel");
const createSnapshot = require("../utils/createSnapshot");

class VersionControl {

    static async commit({

        repoId,

        userId,

        message,

        action,

        fileName

    }) {

        const repo = await Repository.findById(repoId);

        if (!repo) {

            throw new Error("Repository not found");

        }

        const snapshot = await createSnapshot(repoId);

        const commit = await Commit.create({

            repo: repoId,

            parentCommit: repo.headCommit,

            author: userId,

            message,

            action,

            fileName,

            snapshot

        });

        repo.headCommit = commit._id;

        await repo.save();

        return commit;

    }

    static async getHead(repoId){

        const repo=await Repository.findById(repoId);

        return repo.headCommit;

    }

}
module.exports=VersionControl;