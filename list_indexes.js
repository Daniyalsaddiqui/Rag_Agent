import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function listIndexes() {
  try {
    const indexes = await pinecone.listIndexes();
    console.log("Indexes:", JSON.stringify(indexes, null, 2));
  } catch (error) {
    console.error("Error listing indexes:", error);
  }
}

listIndexes();
