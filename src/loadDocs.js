import fs from "fs";
import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export async function loadAndChunkDocs() {
  const files = fs.readdirSync(path.join(process.cwd(), "data"));
  const chunkedDocs = [];
  
  console.log("📁 Processing documents:");
  
  for (const file of files) {
    const filePath = path.join(process.cwd(), "data", file);
    const ext = path.extname(file).toLowerCase();
    
    try {
      let text = "";
      if (ext === ".txt") {
        text = fs.readFileSync(filePath, 'utf8');
      } else if (ext === ".pdf") {
        text = (await pdfParse(fs.readFileSync(filePath))).text;
      } else {
        console.log(`⏭️  Skipped: ${file}`);
        continue;
      }
      
      console.log(`✅ Loaded: ${file}`);
      
      for (let i = 0; i < text.length; i += 250) {
        const chunk = text.slice(i, i + 300);
        if (chunk.trim()) chunkedDocs.push(`[${file}] ${chunk}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${file} - ${error.message}`);
    }
  }
  
  console.log(`📊 Total chunks: ${chunkedDocs.length}\n`);
  return chunkedDocs;
}
