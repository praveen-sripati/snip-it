import { useState, useEffect } from 'react';

const CodeView = ({ isOpen, onClose, snippet }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVisible = isEntering && isOpen;

  return (
    <>
      {/* 1. The Overlay Div with corrected animation */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-25' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 2. The Drawer Div */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 z-50 flex flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">Code View</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-4 flex-grow flex flex-col min-h-0">
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('html')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'html' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'css' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'js' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              JS
            </button>
          </div>
          <div className="relative flex-grow">
            <pre className="absolute inset-0 bg-gray-800 text-white p-4 rounded-md overflow-auto text-sm">
              <code>{snippet[activeTab]}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeView;
