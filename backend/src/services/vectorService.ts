import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const result = await genAI.models.embedContent({
      model: 'text-embedding-004',
      content: text
    });
    return result.values || [];
  } catch (error) {
    console.error('Error generating embedding:', error);
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
