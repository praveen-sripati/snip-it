import { useState } from 'react';
import CodeView from './components/CodeView';
import Nav from './components/Nav';
import SnippetCard from './components/SnippetCard';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme, accent, changeAccent } = useTheme();
  const snippets = [
    {
      id: 1,
      category: 'alert',
      title: 'Basic Alert',
      html: `<div class="alert success">
  <span class="close-btn">&times;</span>
  Success Text
</div>`,
      css: `.alert {
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 12px; /* Rounded corners */
  border: 1px solid transparent;
  position: relative;
}`,
      js: `document.addEventListener('DOMContentLoaded', () => {
  const alertCloseButtons = document.querySelectorAll('.close-btn');

  alertCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const alert = button.parentElement;
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 500); // Wait for the transition to finish
    });
  });
});`,
    },
    {
      id: 2,
      category: 'button',
      title: 'Simple Counter',
      html: `<div class="flex items-center space-x-4"><button id="decrement" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">-</button><span id="count" class="text-xl font-bold">0</span><button id="increment" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">+</button></div>`,
      css: `/* CSS is handled by Tailwind */`,
      js: `const decrementButton = document.getElementById('decrement'); /* ... */`,
    },
  ];

  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState('alert');

  const handleViewCode = (snippet) => {
    setSelectedSnippet(snippet);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedSnippet(null);
    }, 300);
  };

  const filteredSnippets = snippets.filter((snippet) => (filter === 'all' ? true : snippet.category === filter));

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      <Nav setFilter={setFilter} theme={theme} toggleTheme={toggleTheme} accent={accent} changeAccent={changeAccent} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filter === 'alert' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
          } gap-8`}
        >
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onViewCode={handleViewCode} />
          ))}
        </div>
      </main>

      {selectedSnippet && <CodeView isOpen={isDrawerOpen} onClose={handleCloseDrawer} snippet={selectedSnippet} />}
    </div>
  );
}

export default App;
