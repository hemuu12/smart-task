import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-red-700 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-red-600 hover:bg-red-100 rounded-lg p-1 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
