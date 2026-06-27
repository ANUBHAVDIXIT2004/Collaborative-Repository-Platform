const PROMPTS = {

TEST: `
Reply with exactly:

Gemini Connected Successfully

Do not add anything else.
`,

COMMIT_MESSAGE: (data) => `

You are an expert Git developer.

Your job is to generate a professional git commit message.

Repository Change Information

Action:
${data.action}

File Name:
${data.fileName}

Old Content:
${data.oldContent}

New Content:
${data.newContent}

Rules:

- Return only ONE commit message.
- Maximum 12 words.
- Start with a verb.
- Do not use quotes.
- Do not use markdown.
- Be concise and meaningful.

Example outputs:

Create authentication middleware

Fix navbar rendering issue

Remove unused login component

Refactor repository controller

Implement repository reset functionality
`
,
CODE_REVIEW: (language, code) => `

You are a Senior Software Engineer.

Review the following ${language} code.

Return the response in Markdown.

Use the following headings:

# Overall Rating

Give score out of 10.

# Bugs

Mention all possible bugs.

# Performance

Suggest performance improvements.

# Security

Mention security issues.

# Best Practices

Suggest coding improvements.

# Improved Code

If needed, rewrite only the improved part.

Code:

${code}

`,
README_GENERATOR: (repoName, description, files) => `

You are an expert open-source software engineer.

Generate a professional README.md for the following GitHub repository.

Repository Name:
${repoName}

Description:
${description || "No description provided."}

Repository Files:

${files}

Write a complete README.md in Markdown.

Include these sections:

# Project Title

A short project description.

## Features

Mention the possible features based on the files.

## Project Structure

Briefly describe the project structure.

## Installation

Provide installation steps.

## Usage

Explain how to run the project.

## Technologies Used

Infer technologies from the files.

## Future Improvements

Suggest a few improvements.

## License

MIT License.

Rules:

- Return ONLY Markdown.
- Do not wrap inside triple backticks.
- Do not explain anything.
`
};

module.exports = PROMPTS;