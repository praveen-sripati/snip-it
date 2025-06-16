import { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';

// Import only the languages you need for smaller bundle size
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // for HTML
import css from 'highlight.js/lib/languages/css';

// Register the languages with highlight.js
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

const CodeView = ({ isOpen, onClose, snippet }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Create a ref to attach to the <code> element
  const codeRef = useRef(null);

  // This effect runs the highlighter.
  useEffect(() => {
    // Only run if the drawer is open and we have a reference to the code block
    if (isOpen && codeRef.current) {
      // Tell highlight.js to highlight the element
      hljs.highlightElement(codeRef.current);
    }
  }, [isOpen, snippet, activeTab]); // Re-run if the drawer opens or content changes

  useEffect(() => {
    // This effect is for the entry animation of the drawer
    if (isOpen) {
      setIsEntering(true);
    } else {
      setIsEntering(false);
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isVisible = isEntering && isOpen;

  // Helper function to get the correct language class for highlight.js
  const getLanguageClass = (tab) => {
    switch (tab) {
      case 'html':
        return 'language-xml';
      case 'css':
        return 'language-css';
      case 'js':
        return 'language-javascript';
      default:
        return '';
    }
  };

  if (!snippet) return null; // Don't render if there's no snippet data

  return (
    <>
      {/* 1. The Overlay Div */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-25' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 2. The Drawer Div */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 z-50 flex flex-col bg-card text-card-foreground shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="text-xl font-bold">Code View</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-full">
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
          <div className="flex border-b border-border mb-4">
            {snippet?.html && (
              <button
                onClick={() => setActiveTab('html')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'html'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                HTML
              </button>
            )}
            {snippet?.css && (
              <button
                onClick={() => setActiveTab('css')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'css'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                CSS
              </button>
            )}
            {snippet?.js && (
              <button
                onClick={() => setActiveTab('js')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'js'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                JS
              </button>
            )}
          </div>
          <div className="relative flex-grow">
            {/* The 'hljs' class is automatically added by the library, but you can add it for clarity */}
            <pre className="absolute inset-0 bg-muted text-foreground p-4 rounded-md overflow-auto text-sm hljs">
              {/* Attach the ref and add the language class to the <code> tag */}
              <code key={activeTab} ref={codeRef} className={getLanguageClass(activeTab)}>
                {snippet[activeTab]}
              </code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-primary/80 hover:bg-primary text-primary-foreground text-xs font-bold py-1 px-2 rounded"
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
