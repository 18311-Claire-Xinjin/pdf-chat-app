import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";

import { getPineconeIndex } from "../utils/pinecone";
import { sessionService } from "./session.service";

export const pdfProcessorService = {
  async processDocument(sessionId: string, filePath: string): Promise<void> {
    try {
      console.log(`🔄 Starting PDF processing for session: ${sessionId}`);

      // Stage 1: Extract text
      sessionService.updateSession(sessionId, {
        status: "extracting",
      });

      const loader = new PDFLoader(filePath);
      const pdfDocs = await loader.load();
      const text = pdfDocs.map((doc) => doc.pageContent).join("\n");

      // Stage 2: Chunk documents
      sessionService.updateSession(sessionId, {
        status: "chunking",
      });

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await splitter.splitDocuments([
        new Document({ pageContent: text, metadata: { sessionId } }),
      ]);

      // Stage 3: Generate embeddings
      sessionService.updateSession(sessionId, {
        status: "embedding",
        metadata: {
          totalPages: pdfDocs.length,
          totalChunks: docs.length,
        },
      });

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "models/text-embedding-004",
      });

      // Stage 4: Store in Pinecone
      sessionService.updateSession(sessionId, {
        status: "storing",
      });

      const pineconeIndex = await getPineconeIndex();
      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex,
        namespace: sessionId,
      });

      // Stage 5: Complete
      sessionService.updateSession(sessionId, {
        status: "complete",
      });

      console.log(`✅ PDF processing completed for session: ${sessionId}`);
    } catch (error) {
      console.error("❌ PDF processing error:", error);

      sessionService.updateSession(sessionId, {
        status: "error",
      });
    }
  },
};
