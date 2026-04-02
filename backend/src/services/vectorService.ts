import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN || '', {
  use_cache: false,
});

export const generateEmbedding = async (text: string): Promise<number[]> => {
  if (!process.env.HF_TOKEN) {
    console.log('Hugging Face token not configured. Skipping embedding generation.');
    return [];
  }

  try {
    // Using sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
    // Free tier: 30,000 requests/month
    const response = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    });

    // Handle different response types from FeatureExtractionOutput
    if (Array.isArray(response)) {
      // If it's a 2D array, flatten to 1D
      if (Array.isArray(response[0])) {
        return response[0] as number[];
      }
      // If it's already 1D array
      return response as number[];
    }
    
    return [];
  } catch (error) {
    console.error('Error generating Hugging Face embedding:', error);
    return [];
  }
};

export const cosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const findSimilarTasks = async (
  queryEmbedding: number[],
  taskEmbeddings: Array<{ id: string; embedding: string; title: string }>,
  threshold: number = 0.7
): Promise<Array<{ id: string; title: string; similarity: number }>> => {
  const similarities = taskEmbeddings
    .filter(task => task.embedding)
    .map(task => {
      const embedding = JSON.parse(task.embedding);
      const similarity = cosineSimilarity(queryEmbedding, embedding);
      return {
        id: task.id,
        title: task.title,
        similarity
      };
    })
    .filter(result => result.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);

  return similarities;
};
