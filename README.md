# RAG Agent - Retrieval-Augmented Generation System

A lightweight, production-ready RAG (Retrieval-Augmented Generation) system that enables intelligent question-answering from your documents using OpenAI embeddings and Pinecone vector database.

## 🚀 Features

- **Multi-Document Support** - Automatically processes all PDF and TXT files in the data folder
- **Interactive CLI** - Ask unlimited questions through an intuitive terminal interface
- **Smart Retrieval** - Uses semantic search to find relevant context from your documents
- **Fallback Mechanism** - Falls back to general AI knowledge when no relevant data is found
- **Source Attribution** - Tracks which documents answers come from
- **Clean Architecture** - Follows DRY principles with minimal, maintainable code

## 📋 Prerequisites

- Node.js (v18 or higher)
- OpenAI API key
- Pinecone account and API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd RAG
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=rag-index
```

4. Create a Pinecone index:
   - Go to [Pinecone Console](https://app.pinecone.io/)
   - Create a new index named `rag-index`
   - Set dimensions to `3072` (for text-embedding-3-large)
   - Choose your preferred metric (cosine recommended)

## 📁 Project Structure

```
RAG/
├── data/                    # Place your documents here
│   ├── doc.txt
│   └── ml-basics.txt
├── src/
│   ├── config.js           # API configurations
│   ├── embedAndStore.js    # Document embedding logic
│   ├── loadDocs.js         # Document loading & chunking
│   ├── query.js            # Vector search & retrieval
│   └── llm.js              # LLM response generation
├── index.js                # Main interactive CLI
├── .env                    # Environment variables
└── package.json
```

## 🎯 Usage

### Start the Interactive System

```bash
npm start
```

### Workflow

1. **Embed Documents** (first time or when adding new documents):
   - Choose `y` when prompted
   - System will process all files in the `data/` folder

2. **Ask Questions**:
   - Type your question and press Enter
   - Get instant answers from your documents
   - Type `exit` to quit

### Example Session

```
🤖 RAG System Starting...
💾 Embed new documents? (y/n): y

🔄 Embedding documents...
📁 Processing documents:
✅ Loaded: doc.txt
✅ Loaded: ml-basics.txt
📊 Total chunks: 26
✅ Complete!

💬 Ask questions (type 'exit' to quit):

❓ Your question: What is machine learning?
✅ Found data | Chunks: 5
🧠 Machine Learning is a subset of artificial intelligence that enables 
computers to learn and make decisions from data without being explicitly programmed.

❓ Your question: exit
👋 Goodbye!
```

## 📚 Adding Documents

1. Place any `.txt` or `.pdf` file in the `data/` folder
2. Run the system and choose `y` to embed new documents
3. Start asking questions about your documents

## 🔧 Configuration

### Adjust Similarity Threshold

Edit `src/query.js`:
```javascript
const relevantMatches = results.matches.filter(match => match.score >= 0.3);
// Lower = stricter matching, Higher = more lenient
```

### Change Chunk Size

Edit `src/loadDocs.js`:
```javascript
for (let i = 0; i < text.length; i += 250) {
  const chunk = text.slice(i, i + 300);
  // Adjust 250 (overlap) and 300 (chunk size)
}
```

### Switch LLM Model

Edit `src/llm.js`:
```javascript
model: "gpt-4o",  // Change to gpt-3.5-turbo, gpt-4, etc.
```

## 🏗️ Architecture

```
User Question
     ↓
[Query Embedding] → OpenAI API
     ↓
[Vector Search] → Pinecone
     ↓
[Retrieve Context]
     ↓
[Generate Answer] → OpenAI GPT-4
     ↓
User Response
```

## 🔐 Security Notes

- Never commit your `.env` file
- Add `.env` to `.gitignore`
- Rotate API keys regularly
- Use environment-specific keys for production

## 📊 Performance

- **Embedding Speed**: ~1-2 seconds per document
- **Query Speed**: ~1-2 seconds per question
- **Supported Formats**: TXT, PDF
- **Max Document Size**: Limited by OpenAI token limits

## 🐛 Troubleshooting

### PDF Processing Errors
- Ensure `pdf-parse` is installed: `npm install pdf-parse`
- Some PDFs may have encoding issues - convert to TXT if needed

### No Relevant Data Found
- Lower the similarity threshold in `src/query.js`
- Ensure documents are properly embedded
- Check if question matches document content

### API Errors
- Verify API keys in `.env`
- Check API rate limits
- Ensure Pinecone index exists and has correct dimensions

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Follow existing code style (DRY principles)
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- OpenAI for embeddings and GPT models
- Pinecone for vector database
- Node.js community for excellent packages

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Node.js, OpenAI, and Pinecone**
