const axios = require("axios");

const generateCode = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a code generator. Based on the user's prompt, respond with exactly 3 code blocks:
  
\`\`\`html
<!-- index.html -->
...
\`\`\`

\`\`\`css
/* style.css */
...
\`\`\`

\`\`\`js
// script.js
...
\`\`\`

No extra comments, explanations or markdown — just clean, usable code and use random non clashable calsses or ids for css and dont use html tags for styling insted use class and ids and use blue green red for colors if no mentioned and always use some color as body background color until unless not stated .  and remember to Generate separate HTML, CSS, and JS code for a website based on prompt. and write the css in modern and responsive and use create awsome ui and use animation to  make it looks good.`,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Prompt2Site",
        },
      }
    );
    const content = aiResponse.data.choices[0].message.content;

    const { html, css, js } = parseAIResponse(content);
    res.json({ html, css, js });
  } catch (err) {
    console.error(err?.aiResponse?.data || err.message);
    res.status(500).json({ error: "Failed to generate code." });
  }
};

function parseAIResponse(content) {
  const codeBlocks = [
    ...content.matchAll(/```(?:html|css|js)?\s*([\s\S]*?)```/g),
  ];

  if (codeBlocks.length >= 3) {
    return {
      html: codeBlocks[0][1].trim(),
      css: codeBlocks[1][1].trim(),
      js: codeBlocks[2][1].trim(),
    };
  }

  return {
    html: "<!-- No HTML provided -->",
    css: "/* No CSS provided */",
    js: "// No JS provided",
  };
}

module.exports = { generateCode };
