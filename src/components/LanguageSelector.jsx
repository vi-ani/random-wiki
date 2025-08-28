import React from 'react';

function LanguageSelector({ language, setLanguage }) {
  const changeLang = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select value={language} onChange={changeLang}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="et">Eesti</option>
    </select>
  );
}

export default LanguageSelector;
