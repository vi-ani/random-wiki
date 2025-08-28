import React, { useState, useEffect } from 'react';
import WikiFetcher from './components/WikiFetcher';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import translations from './i18n';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key) => translations[language]?.[key] || key;

  return (
    <div className="App">
      <h1>WikiSurprise</h1>
      <ThemeToggle theme={theme} setTheme={setTheme} t={t}/>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <WikiFetcher language={language} t={t} />
    </div>
  );
}

export default App;
