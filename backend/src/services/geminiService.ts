import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

export const generateTaskSummary = async (tasks: Task[]): Promise<string> => {
  if (tasks.length === 0) {
    return '🎉 **Excellent Work!**\n\nYou have no pending tasks. Your task list is clear! Take this time to plan ahead or enjoy a well-deserved break.';
  }

  if (!process.env.GROQ_API_KEY) {
    // Fallback to static summary if no API key
    return generateStaticSummary(tasks);
  }

  const taskList = tasks
    .map((task, index) => {
      return `${index + 1}. [${task.priority.toUpperCase()}] ${task.title}
   Status: ${task.status}
   ${task.description ? `Description: ${task.description}` : ''}`;
    })
    .join('\n');

  const prompt = `You are a helpful AI assistant providing a daily briefing for a task management system.

Here are the current tasks:

${taskList}

Please provide a concise, friendly daily briefing that:
1. Summarizes the overall workload (total tasks, breakdown by status and priority)
2. Highlights urgent or high-priority items that need immediate attention
3. Offers a brief motivational insight or productivity tip
4. Keeps the tone professional yet encouraging

Keep the briefing under 200 words.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    return chatCompletion.choices[0]?.message?.content || generateStaticSummary(tasks);
  } catch (error) {
    console.error('Groq API Error:', error);
    return generateStaticSummary(tasks);
  }
};

function generateStaticSummary(tasks: Task[]): string {
  const totalTasks = tasks.length;
  const byStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const highPriorityTasks = tasks.filter(t => t.priority === 'high');

  let summary = `# 📊 Daily Task Briefing\n\n`;
  summary += `You have **${totalTasks}** ${totalTasks === 1 ? 'task' : 'tasks'}.\n\n`;
  
  summary += `**Status:** `;
  Object.entries(byStatus).forEach(([status, count], idx) => {
    summary += `${status}: ${count}${idx < Object.keys(byStatus).length - 1 ? ', ' : ''}`;
  });
  
  summary += `\n**Priority:** `;
  Object.entries(byPriority).forEach(([priority, count], idx) => {
    summary += `${priority}: ${count}${idx < Object.keys(byPriority).length - 1 ? ', ' : ''}`;
  });

  if (highPriorityTasks.length > 0) {
    summary += `\n\n⚠️ **High Priority:** ${highPriorityTasks.map(t => t.title).join(', ')}`;
  }

  summary += `\n\n💡 Focus on high-priority items first for maximum impact!`;
  return summary;
}
