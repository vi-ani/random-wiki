import React from 'react';

function ThemeToggle({ theme, setTheme, t }) {
  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
        onClick={toggle}
        className={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'}
        >
        {t('themeToggle')} ({t(theme)})
        </button>

  );
}

export default ThemeToggle;
