import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error(
      "PINECONE_API_KEY is not defined in environment variables."
    );
  }

  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Get Pinecone index instance (with existence check)
export const getPineconeIndex = async () => {
  if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error(
      "PINECONE_INDEX_NAME is not defined in environment variables."
    );
  }

  const client = await getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME;

  try {
    // Check if index exists
    const list = await client.listIndexes();
    const exists = list.indexes?.some((i) => i.name === indexName);

    if (!exists) {
      throw new Error(
        `Index "${indexName}" not found in your Pinecone project.`
      );
    }

    // Return index reference
    return client.index(indexName);
  } catch (error) {
    console.error("❌ Error fetching Pinecone index:", error);
    throw new Error(`Failed to retrieve Pinecone index: ${indexName}`);
  }
};
