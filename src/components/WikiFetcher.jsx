import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

function WikiFetcher({ language, t }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(() => {
    // Загружаем из localStorage при первом рендере
    const saved = localStorage.getItem('wiki_history');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://${language}.wikipedia.org/api/rest_v1/page/random/summary`);
      setArticle(response.data);

      // Обновляем историю
      const newEntry = {
        title: response.data.title,
        url: response.data.content_urls.desktop.page,
        lang: language,
        timestamp: new Date().toISOString()
      };

      const updatedHistory = [newEntry, ...history].slice(0, 10); // максимум 10 записей
      setHistory(updatedHistory);
      localStorage.setItem('wiki_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [language]);

  return (
    <div>
      <button onClick={fetchArticle}>{t('newArticle')}</button>

      {loading && <p>{t('loading')}</p>}

      {article && (
        <div>
          <h2>{article.title}</h2>
        <p>{article.extract}</p>
        <div className="qr-container">
        <QRCodeCanvas
            value={article.content_urls.desktop.page}
            size={200}
        />
        <div style={{ marginTop: '10px' }}>
            <a href={article.content_urls.desktop.page} target="_blank" rel="noreferrer">
            {t('openWiki')}
            </a>
        </div>
        </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-container">
          <h3>{t('historyTitle')}</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  [{item.lang}] {item.title}
                </a>
              </li>
            ))}
          </ul>
          <button
            style={{ backgroundColor: '#e74c3c', marginTop: '10px' }}
            onClick={() => {
              setHistory([]);
              localStorage.removeItem('wiki_history');
            }}
          >
            {t('clearHistory')}
          </button>
        </div>
      )}
    </div>
  );
}


export default WikiFetcher;
