const File = require("../models/File");

const createSnapshot = async (repoId) => {

    const files = await File.find({

        repo: repoId

    });

    return files.map(file => ({

        name: file.name,

        content: file.content

    }));

};

module.exports = createSnapshot;