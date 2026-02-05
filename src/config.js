import dotenv from "dotenv";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config();

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
export const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || "rag-index");
