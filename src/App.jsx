import { useState } from 'react';
import CodeView from './components/CodeView';
import Nav from './components/Nav';
import SnippetCard from './components/SnippetCard';
import { ThemeIcon } from './components/ThemeIcon';
import { ThemeOption } from './components/ThemeOption';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme, accent, changeAccent } = useTheme();
  const snippets = [
    {
      id: 1,
      category: 'html',
      title: 'Styled Button',
      html: `<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>`,
      css: `.bg-blue-500 {
      background-color: #3b82f6;
    }
    .hover\\:bg-blue-700:hover {
      background-color: #1d4ed8;
    }
    .text-white {
      color: #ffffff;
    }
    .font-bold {
      font-weight: 700;
    }
    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .rounded {
      border-radius: 0.25rem;
    }`,
      js: `// No JavaScript needed for this snippet`,
    },
    {
      id: 2,
      category: 'js',
      title: 'Simple Counter',
      html: `<div class="flex items-center space-x-4">
      <button id="decrement" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        -
      </button>
      <span id="count" class="text-xl font-bold">0</span>
      <button id="increment" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        +
      </button>
    </div>`,
      css: `/* CSS is handled by Tailwind classes in the HTML */`,
      js: `const decrementButton = document.getElementById('decrement');
    const incrementButton = document.getElementById('increment');
    const countSpan = document.getElementById('count');

    let count = 0;

    decrementButton.addEventListener('click', () => {
      count--;
      countSpan.textContent = count;
    });

    incrementButton.addEventListener('click', () => {
      count++;
      countSpan.textContent = count;
    });`,
    },
  ];

  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleViewCode = (snippet) => {
    setSelectedSnippet(snippet);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    // 1. Start the closing animation
    setIsDrawerOpen(false);

    // 2. After the animation finishes (300ms), remove the component from the DOM
    setTimeout(() => {
      setSelectedSnippet(null);
    }, 300);
  };

  const filteredSnippets = snippets.filter((snippet) => (filter === 'all' ? true : snippet.category === filter));

  return (
    <>
      <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
        <div className="container mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
          {/* Main Settings Card */}
          <div className="space-y-8 rounded-lg border border-border bg-card p-6 sm:p-8">
            {/* ----- Theme Mode Setting ----- */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-card p-2 text-card-foreground">
                  <ThemeIcon theme={theme} />
                </div>
                <span className="font-semibold text-card-foreground capitalize">{theme} Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Toggle
              </button>
            </div>

            {/* ----- Accent Color Setting ----- */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ThemeOption
                  themeName="Blue"
                  accentColor="#60A5FA"
                  isSelected={accent === 'theme-blue'}
                  onSelect={() => changeAccent('theme-blue')}
                />
                <ThemeOption
                  themeName="Green"
                  accentColor="#22C55E"
                  isSelected={accent === 'theme-green'}
                  onSelect={() => changeAccent('theme-green')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Nav setFilter={setFilter} />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} onViewCode={handleViewCode} />
            ))}
          </div>
        </main>

        {/* This is the crucial change: only mount CodeView when a snippet is selected */}
        {selectedSnippet && <CodeView isOpen={isDrawerOpen} onClose={handleCloseDrawer} snippet={selectedSnippet} />}
      </div>
    </>
  );
}

export default App;
