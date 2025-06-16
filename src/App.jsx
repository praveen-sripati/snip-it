import { useState } from 'react';
import CodeView from './components/CodeView';
import Nav from './components/Nav';
import SnippetCard from './components/SnippetCard';
import { useTheme } from './hooks/useTheme';
import { basicAlerts, closableAlerts, closableIconAlerts, iconAlerts } from './snippets/Alerts/Alerts'; // Assuming you have a data file for alerts
import { buttonSnippets } from './snippets/Buttons/Buttons';

function App() {
  const { theme, toggleTheme, accent, changeAccent } = useTheme();
  const snippets = [
    { ...basicAlerts },
    { ...closableAlerts },
    { ...iconAlerts },
    { ...closableIconAlerts },
    ...buttonSnippets
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
