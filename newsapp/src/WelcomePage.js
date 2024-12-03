import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WelcomePage.css';

function WelcomePage() {
  const [newsList, setNewsList] = useState([]);
  const [groupedNews, setGroupedNews] = useState({});
  const [currentIndices, setCurrentIndices] = useState({});
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_news/?model_name=nb');
        const news = response.data.recommended_news || [];
        setNewsList(news);
        
        // Group news by prediction
        const grouped = news.reduce((acc, item) => {
          const prediction = item.prediction || 'uncategorized';
          if (!acc[prediction]) {
            acc[prediction] = [];
          }
          acc[prediction].push(item);
          return acc;
        }, {});
        
        setGroupedNews(grouped);
        
        // Initialize current indices for each category
        const indices = {};
        Object.keys(grouped).forEach(key => {
          indices[key] = 0;
        });
        setCurrentIndices(indices);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  const handleNext = (category) => {
    setCurrentIndices(prev => ({
      ...prev,
      [category]: Math.min(
        prev[category] + ITEMS_PER_PAGE,
        groupedNews[category].length - 1
      )
    }));
  };

  const handlePrev = (category) => {
    setCurrentIndices(prev => ({
      ...prev,
      [category]: Math.max(0, prev[category] - ITEMS_PER_PAGE)
    }));
  };

  return (
    <div className="welcome-container">
      <h2>News Articles</h2>
      {Object.entries(groupedNews).map(([category, news]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="carousel-container">
            <button 
              className="nav-button prev"
              onClick={() => handlePrev(category)}
              disabled={currentIndices[category] === 0}
            >
              ←
            </button>
            <div className="news-list">
              {news
                .slice(currentIndices[category], currentIndices[category] + ITEMS_PER_PAGE)
                .map((item, index) => (
                  <div className="news-card" key={index}>
                    <img
                      src={item.url_to_image || 'https://via.placeholder.com/300x150'}
                      alt={item.title}
                      className="news-card-image"
                    />
                    <div className="news-card-text">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="source-row">
                      <small className="source-text">Source: {item.source_name || 'Unknown'}</small>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-more-btn"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
            </div>
            <button 
              className="nav-button next"
              onClick={() => handleNext(category)}
              disabled={currentIndices[category] >= news.length - ITEMS_PER_PAGE}
            >
              →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WelcomePage;