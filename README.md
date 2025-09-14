# PDF Chat RAG App

A full-stack AI-powered application that lets users upload and chat with their PDF documents. It combines seamless PDF processing, intelligent responses, and a minimalistic design to deliver a smooth and intuitive user experience.

## ✨ Features

- **PDF Upload & Processing**: Upload and process PDF documents
- **AI-Powered Chat**: Ask questions about your documents and get AI-generated responses
- **PDF Viewer & Sources**: View uploaded PDFs and see sources for each AI response
- **Session Persistence**: Continue conversations without losing context across sessions
- **Sample PDF**: Test the app instantly using a built-in example PDF
- **Minimalistic Design**: Clean and distraction-free user interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

**Frontend**

- React (Vite, TypeScript)
- TailwindCSS + shadcn/ui
- react-pdf (PDF rendering)
- react-markdown (chat/message rendering)

**Backend**

- Node.js + Express
- Multer (file uploads)
- Redis (session persistence / caching)
- Pinecone (vector database for document embeddings)

**AI Tools**

- LangChain (orchestration)
- Google Gemini (LLM)

**Tooling & Dev Experience**

- Bun Workspaces (monorepo management)
- Husky + lint-staged (git hooks)
- ESLint + Prettier (code quality & formatting)

**Deployment**

- Frontend → [Vercel](https://vercel.com)
- Backend → [Render](https://render.com)

## ⚙️ Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)
- [Node.js](https://nodejs.org/) (v20 or later)
- [Git](https://git-scm.com/)

## 🔥 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/thedreamydev/pdf-chat-app.git
   cd pdf-chat-app
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `packages/client` and `packages/server`
   - Update the environment variables with your configuration

4. **Start the development servers**

   ```bash
   # Start both client and server in development mode
   bun run dev
   ```

   - Frontend will be available at `http://localhost:5173`
   - Backend API will be available at `http://localhost:3000`

## 📂 Project Structure

```
.
├── packages/
│   ├── client/          # Frontend React application
│   │   ├── public/      # Static files
│   │   ├── src/         # Source files
│   │   └── ...
│   │
│   └── server/          # Backend Node.js server
│       ├── controllers/ # Request handlers
│       ├── routes/      # API routes
│       ├── services/    # Business logic
│       └── ...
│
├── .gitignore
├── bun.lock
├── package.json
└── README.md
```

## 🚀 Available Scripts

- `bun run dev` - Start development servers for both client and server
- `bun run format` - Format code using Prettier
- `bun run prepare` - Set up Git hooks using Husky

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Connect With Me

- 🐦 [X (Twitter)](https://x.com/thedreamydev)
- 💼 [LinkedIn](https://www.linkedin.com/in/thedreamydev)
- 🌐 [Portfolio](https://thedreamydev.vercel.app)
