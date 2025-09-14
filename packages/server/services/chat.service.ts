import { PineconeStore } from "@langchain/pinecone";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { performance } from "node:perf_hooks";

import { getPineconeIndex } from "../utils/pinecone.js";

export const chatService = {
  async searchRelevantDocuments(sessionId: string, query: string) {
    const pineconeIndex = await getPineconeIndex();

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "models/text-embedding-004",
    });

    // Create store wrapper on top of pinecone
    const store = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: sessionId, // scoped to this user's session
    });

    // query the vector DB
    const topK =
      query.toLowerCase().includes("summarize") ||
      query.toLowerCase().includes("summary")
        ? 20
        : 6;
    const results = await store.similaritySearch(query, topK);

    return results;
  },

  async askQuestion(sessionId: string, query: string) {
    // Stage 1: Search Pinecone
    const relevantDocs = await this.searchRelevantDocuments(sessionId, query);

    // Stage 2: Prepare context
    const context = relevantDocs
      .map((doc, i) => `Source ${i + 1}:\n${doc.pageContent}`)
      .join("\n\n");

    // - When citing, use the format [sourceX] (e.g., [source1], [source2]) instead of full text.
    const prompt = `
You are a helpful assistant. Use the context below to answer the user's question.
- Keep your answer concise and under 200 tokens.
- If the answer is not in the provided context, respond with:
  "Answer is not available in the provided document."

Context:
${context}

User Question:
${query}

Answer (max 200 tokens):
`;

    // Step 3: Call Gemini
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-flash",
      maxOutputTokens: 200,
    });

    const start = performance.now();

    const response = await model.invoke(prompt);

    const end = performance.now();
    const generationTime = ((end - start) / 1000).toFixed(2); // seconds

    return {
      id: crypto.randomUUID(),
      content: response.content,
      sources: Array.from(
        new Set(relevantDocs.map((doc) => doc.metadata?.["loc.pageNumber"]))
      ).map((pageNumber, i) => {
        return {
          id: i + 1,
          pageNumber,
        };
      }),
      generationTime: `${generationTime}s`,
      usage_metadata: {
        input_tokens: response?.usage_metadata?.input_tokens,
        output_tokens: response?.usage_metadata?.output_tokens,
        total_tokens: response?.usage_metadata?.total_tokens,
      },
    };
  },
};
