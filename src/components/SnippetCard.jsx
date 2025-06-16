import { useState } from 'react';
import { Alert } from './Alerts/Alert';

const SnippetCard = ({ snippet, onViewCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-4">{snippet.title}</h3>
      {snippet.category === 'alert' && <Alert snippet={snippet} variant="success" className="mb-4"></Alert>}
      <div className="mt-auto">
        <hr className="text-gray-300 my-6" />
        <div className="flex justify-between items-center">
          <button
            onClick={() => onViewCode(snippet)}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            View Code
          </button>
          <button
            onClick={handleCopy}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
