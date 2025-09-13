import path from "node:path";
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
      // Stage 1: Extract text
      await sessionService.updateSession(sessionId, {
        status: "extracting",
      });

      const loader = new PDFLoader(filePath);
      const pdfDocs = await loader.load();

      // Preserve per-page metadata and include sessionId
      const docsWithMeta = pdfDocs.map(
        (d) =>
          new Document({
            pageContent: d.pageContent,
            metadata: { ...(d.metadata ?? {}), sessionId },
          })
      );

      // Stage 2: Chunk documents
      await sessionService.updateSession(sessionId, {
        status: "chunking",
      });

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await splitter.splitDocuments(docsWithMeta);

      // Stage 3: Generate embeddings
      await sessionService.updateSession(sessionId, {
        status: "embedding",
        metadata: {
          totalPages: pdfDocs.length,
          totalChunks: docs.length,
        },
      });

      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
      }

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "models/text-embedding-004",
      });

      // Stage 4: Store in Pinecone
      await sessionService.updateSession(sessionId, {
        status: "storing",
      });

      const pineconeIndex = await getPineconeIndex();
      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex,
        namespace: sessionId,
      });

      // Stage 5: Complete
      await sessionService.updateSession(sessionId, {
        status: "complete",
      });

      console.log(`✅ PDF processing completed for session: ${sessionId}`);
    } catch (error) {
      console.error("❌ PDF processing error:", error);

      await sessionService.updateSession(sessionId, {
        status: "error",
      });
    }
  },
};
