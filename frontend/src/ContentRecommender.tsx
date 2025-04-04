// src/ContentRecommender.tsx
import React, { useEffect, useState } from 'react';

type ContentRecommenderProps = {
  contentId: string;  // This will now directly be the itemId
};

const ContentRecommender: React.FC<ContentRecommenderProps> = ({ contentId }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (contentId) {
      fetchRecommendations(contentId);
    }
  }, [contentId]);

  const fetchRecommendations = async (contentId: string) => {
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
    <div className="recommender">
      <h2>Content-Based Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recId, idx) => (
            <li key={idx}>{recId}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default ContentRecommender;
