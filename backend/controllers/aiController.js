const { askGemini } = require("../services/gemini.service");
const PROMPTS = require("../utils/prompts");

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
module.exports = {

    testAI,
    generateCommitMessage,
    reviewCode,
};