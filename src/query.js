import { openai, index } from "./config.js";

export async function retrieveContext(question) {
  const queryEmbedding = (await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: question,
  })).data[0].embedding;

  const results = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
  });

  const relevantMatches = results.matches.filter(match => match.score >= 0.3);
  
  return relevantMatches.length === 0 
    ? "check your db they may not be any relevant context"
    : relevantMatches.map(m => m.metadata.text).join("\n\n");
}
