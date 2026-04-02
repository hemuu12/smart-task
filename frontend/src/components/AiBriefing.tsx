import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { taskApi } from '../services/api';

export default function AiBriefing() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBriefing = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getSummary();
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate briefing. Please check your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:sticky lg:top-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-purple-900">AI Briefing</h2>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
        Get an AI-powered summary of your pending tasks with insights and recommendations.
      </p>

      <button
        onClick={generateBriefing}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Generate Briefing
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
        </div>
      )}

      {summary && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl">
          <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Sparkles className="w-4 h-4" />
            Your Daily Briefing
          </h3>
          <div className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}
