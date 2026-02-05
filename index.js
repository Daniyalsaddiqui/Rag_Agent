import { embedAndStore } from "./src/embedAndStore.js";
import { retrieveContext } from "./src/query.js";
import { askLLM } from "./src/llm.js";
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = query => new Promise(resolve => rl.question(query, resolve));

async function main() {
  console.log("🤖 RAG System Starting...");
  
  if ((await ask("💾 Embed new documents? (y/n): ")).toLowerCase() === 'y') {
    await embedAndStore();
  }
  
  console.log("💬 Ask questions (type 'exit' to quit):\n");
  
  while (true) {
    const question = await ask("❓ Your question: ");
    
    if (question.toLowerCase() === 'exit') {
      console.log("👋 Goodbye!");
      break;
    }
    
    if (!question.trim()) continue;
    
    const context = await retrieveContext(question);
    
    if (context?.trim()) {
      const answer = await askLLM(context, question);
      console.log(`\n🧠 ${answer}\n`);
    } else {
      const answer = await askLLM("", question, true);
      console.log(`\n🧠 ${answer}\n💡 Consider adding this topic to your database\n`);
    }
  }
  
  rl.close();
}

main().catch(console.error);
