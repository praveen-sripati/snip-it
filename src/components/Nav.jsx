import { ThemeIcon } from './ThemeIcon';
import { ThemeOption } from './ThemeOption';

const Nav = ({ setFilter, theme, toggleTheme, accent, changeAccent }) => {
  return (
    <nav className="w-64 bg-card text-card-foreground shadow-md p-4 flex flex-col justify-between">
      {/* ===== Snippet Filters (Top Section) ===== */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Snippets</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setFilter('all')}
              className="w-full text-left bg-muted hover:bg-muted/80 font-bold py-2 px-4 rounded"
            >
              All Snippets
            </button>
          </li>
          <li>
            <button
              onClick={() => setFilter('html')}
              className="w-full text-left bg-muted hover:bg-muted/80 font-bold py-2 px-4 rounded"
            >
              HTML Snippets
            </button>
          </li>
          <li>
            <button
              onClick={() => setFilter('css')}
              className="w-full text-left bg-muted hover:bg-muted/80 font-bold py-2 px-4 rounded"
            >
              CSS Snippets
            </button>
          </li>
          <li>
            <button
              onClick={() => setFilter('js')}
              className="w-full text-left bg-muted hover:bg-muted/80 font-bold py-2 px-4 rounded"
            >
              JS Snippets
            </button>
          </li>
        </ul>
      </div>

      {/* ===== Theme Settings (Bottom Section) ===== */}
      <div className="space-y-4 border-t border-border pt-4">
        {/* ----- Theme Mode Setting ----- */}
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div className="flex items-center space-x-3">
            <ThemeIcon theme={theme} />
            <span className="text-sm font-semibold capitalize">{theme} Mode</span>
          </div>
          <button
            onClick={(e) => toggleTheme(e)}
            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
          >
            Toggle
          </button>
        </div>

        {/* ----- Accent Color Setting ----- */}
        <div className="space-y-2">
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
    </nav>
  );
};

export default Nav;