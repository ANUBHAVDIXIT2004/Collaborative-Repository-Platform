const { askGemini } = require("../services/gemini.service");
const PROMPTS = require("../utils/prompts");
const Repository = require("../models/repoModel");
const File = require("../models/File");
const VersionControl = require("../services/VersionControl");
const testAI = async (req, res) => {

    try {

        const response = await askGemini(PROMPTS.TEST);

        res.status(200).json({

            success: true,

            message: response

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Gemini API Error"

        });

    }

};
const generateCommitMessage = async (req, res) => {

    try {

        const {
            action,
            fileName,
            oldContent,
            newContent
        } = req.body;

        if (!action || !fileName) {
            return res.status(400).json({
                success: false,
                message: "Missing required data"
            });
        }

        const prompt = PROMPTS.COMMIT_MESSAGE({
            action,
            fileName,
            oldContent: oldContent || "",
            newContent: newContent || ""
        });

        const response = await askGemini(prompt);

        res.status(200).json({
            success: true,
            commitMessage: response.trim()
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to generate commit message"
        });

    }

};
const reviewCode = async (req,res)=>{

try{

const {code,language}=req.body;

if(!code){

return res.status(400).json({

success:false,

message:"Code required"

});

}

const prompt= PROMPTS.CODE_REVIEW(

language,

code

);

const response=await askGemini(prompt);

res.json({

success:true,

review:response

});

}

catch(err){

console.log(err);

res.status(500).json({

success:false

});

}

}
const generateReadme = async (req, res) => {

    try {

        const { repoId, userId } = req.body;

        const repo = await Repository.findById(repoId);

        if (!repo) {

            return res.status(404).json({
                success: false,
                message: "Repository not found"
            });

        }

        if (repo.owner.toString() !== userId) {

            return res.status(403).json({
                success: false,
                message: "Only the repository owner can generate a README."
            });

        }

        const files = await File.find({
            repo: repoId
        });

        if (files.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Repository has no files."
            });

        }

        // Build file summary for AI
        const fileSummary = files.map(file => {

            return `
File: ${file.name}

Content:
${file.content.substring(0, 1000)}
`;

        }).join("\n---------------------\n");

        const prompt = PROMPTS.README_GENERATOR(

            repo.name,

            repo.description,

            fileSummary

        );

        const readme = await askGemini(prompt);

        let readmeFile = await File.findOne({

            repo: repoId,

            name: "README.md"

        });

        if (readmeFile) {

            readmeFile.content = readme.trim();

            await readmeFile.save();

        }

        else {

            readmeFile = await File.create({

                repo: repoId,

                name: "README.md",

                content: readme.trim(),

                createdBy: userId

            });

        }

        await VersionControl.commit({

            repoId,

            userId,

            message: "docs: generate README using AI",

            action: "ADD",

            fileName: "README.md"

        });

        res.status(200).json({

            success: true,

            file: readmeFile,

            message: "README generated successfully."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Failed to generate README"

        });

    }

};
module.exports = {

    testAI,
    generateCommitMessage,
    reviewCode,
    generateReadme,
};