import { useState, useEffect } from 'react';
import lightThemeUrl from 'highlight.js/styles/github.css?url';
import darkThemeUrl from 'highlight.js/styles/github-dark.css?url';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [accent, setAccent] = useState(() => localStorage.getItem('accent') || 'theme-blue');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- NEW: Effect for dynamically swapping the highlight.js theme ---
  useEffect(() => {
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.id = 'highlight-js-theme'; // Give it an ID for easy removal

    // Set the href to the correct stylesheet URL based on the current theme
    themeLink.href = theme === 'light' ? lightThemeUrl : darkThemeUrl;

    // Find and remove the old theme link if it exists
    const oldLink = document.getElementById('highlight-js-theme');
    if (oldLink) {
      oldLink.remove();
    }
    
    // Add the new theme link to the document's head
    document.head.appendChild(themeLink);

  }, [theme]); // This effect runs only when the 'theme' changes

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-blue', 'theme-green');
    root.classList.add(accent);
    localStorage.setItem('accent', accent);
  }, [accent]);

  const toggleTheme = (event) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const transition = document.startViewTransition(() => {
      const root = document.documentElement;
      root.classList.remove(theme);
      root.classList.add(nextTheme);
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const root = document.documentElement;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      
      // Set the custom properties for the animation
      root.style.setProperty('--ripple-x', x + 'px');
      root.style.setProperty('--ripple-y', y + 'px');
      root.style.setProperty('--ripple-radius', endRadius + 'px');
      
      // Add the class to trigger the animation in CSS
      root.classList.add('is-rippling');

      // Clean up the class after the animation is done
      setTimeout(() => {
        root.classList.remove('is-rippling');
        root.style.removeProperty('--ripple-x');
        root.style.removeProperty('--ripple-y');
        root.style.removeProperty('--ripple-radius');
      }, 600); // Must match animation duration in CSS
    });
  };

  const changeAccent = (newAccent) => {
    setAccent(newAccent);
  };

  return { theme, toggleTheme, accent, changeAccent };
};