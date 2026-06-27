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

`
};

module.exports = PROMPTS;