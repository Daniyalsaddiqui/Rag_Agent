import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = process.env.PINECONE_INDEX_NAME || "rag-index";

async function createIndex() {
  try {
    console.log(`Creating index: ${indexName}...`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 3072, // Matches text-embedding-3-large
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    console.log(`Index ${indexName} created successfully.`);
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

createIndex();
