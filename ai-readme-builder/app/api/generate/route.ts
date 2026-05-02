import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const body = await request.json();
  const {
    projectName,
    description,
    techStack,
    features,
    installation,
    usage,
    license,
    github,
    demo,
    authorName,
  } = body;

  const prompt = `You are a professional technical writer. Generate a complete, well-structured README.md file in Markdown format for the following project.

Project Details:
- Name: ${projectName}
- Description: ${description}
- Tech Stack: ${techStack?.join(", ") || "Not specified"}
- Key Features: ${features || "Not specified"}
- Installation Steps: ${installation || "Standard npm/yarn install"}
- Usage Instructions: ${usage || "Not specified"}
- License: ${license || "MIT"}
- GitHub URL: ${github || ""}
- Demo URL: ${demo || ""}
- Author: ${authorName || ""}

Requirements for the README:
1. Start with a clean project title with a short tagline
2. Include badges (license, version, etc.) where appropriate
3. Write a compelling introduction/about section
4. List key features with bullet points and emojis
5. Include a Tech Stack section with icons/badges if possible (use shields.io style)
6. Provide clear installation instructions in a code block
7. Show usage examples with code blocks
8. Include a contributing section
9. Add a license section
10. If GitHub or demo URLs are provided, include them prominently

Make it look professional and complete. Use proper Markdown syntax. Output ONLY the README content, no explanations.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return Response.json({ error: "Unexpected response type" }, { status: 500 });
    }

    return Response.json({ readme: content.text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate README";
    return Response.json({ error: message }, { status: 500 });
  }
}
