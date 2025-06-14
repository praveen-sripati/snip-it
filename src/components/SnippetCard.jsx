import { useState } from 'react';

const SnippetCard = ({ snippet, onViewCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">{snippet.title}</h3>
      <div
        className="border rounded-md p-4 mb-4"
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      ></div>
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
  );
};

export default SnippetCard;