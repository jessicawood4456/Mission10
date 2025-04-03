// src/ContentRecommender.tsx

import React, { useState } from 'react';

const ContentRecommender = () => {
  const [contentId, setContentId] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/recommend/content/${contentId}`
      );
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  return (
    <>
      <div className="recommender">
        <h2>Content-Based Recommendations</h2>
        <input
          type="text"
          value={contentId}
          onChange={(e) => setContentId(e.target.value)}
          placeholder="Enter contentId"
        />
        <button onClick={fetchRecommendations}>Get Recommendations</button>

        {recommendations.length > 0 && (
          <ul>
            {recommendations.map((recId, idx) => (
              <li key={idx}>{recId}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ContentRecommender;
