import { openai, index } from "./config.js";
import { loadAndChunkDocs } from "./loadDocs.js";
import crypto from "crypto";

export async function embedAndStore() {
  const chunks = await loadAndChunkDocs();
  const vectors = [];

  for (const chunk of chunks) {
    const embedding = (await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: chunk,
    })).data[0].embedding;

    vectors.push({
      id: crypto.randomUUID(),
      values: embedding,
      metadata: { text: chunk },
    });
  }

  await index.upsert(vectors);
  console.log("✅ Data embedded & stored in Pinecone");
}
