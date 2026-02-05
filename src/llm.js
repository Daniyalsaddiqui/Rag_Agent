import { openai } from "./config.js";

export async function askLLM(context, question, useGeneralKnowledge = false) {
    const systemPrompt = context?.trim() 
        ? `You are a helpful assistant that answers questions based ONLY on the provided context from the database.

RULES:
- Answer using ONLY the information in the context below
- If the context contains the answer, provide it clearly and concisely
- If the context is related but doesn't fully answer, say "Based on the available information: [partial answer]"
- DO NOT use external knowledge
- Be specific and cite relevant parts when possible`
        : `You are a helpful assistant. The user's question is not in the stored database, so provide a helpful answer using your general knowledge.

RULES:
- Be accurate and helpful
- Keep answers concise (2-4 sentences)
- If you're uncertain, acknowledge it
- Suggest the user add this information to their database if it would be useful`;

    const userPrompt = context?.trim() 
        ? `Context from database:\n${context}\n\nQuestion: ${question}\n\nAnswer:`
        : `Question: ${question}\n\nAnswer:`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
    });

    return response.choices[0].message.content.trim();
}
