import React, { useState, useEffect } from 'react';
import './App.css';
import ContentRecommender from './ContentRecommender';  // Import the ContentRecommender component

// Hardcoded item IDs
const itemIds = [
  -9222795471790223670, -9216926795620865886, -9194572880052200111,
  -9192549002213406534, -9190737901804729417, 
  -9184137057748005562, -9176143510534135851, -9172673334835262304,
  -9171475473795142532,
];

type CsvRec = {
  'Recommendation 1': string;
  'Recommendation 2': string;
  'Recommendation 3': string;
  'Recommendation 4': string;
  'Recommendation 5': string;
};

const App = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [cfRecs, setCfRecs] = useState<string[]>([]);
  const [cfData, setCfData] = useState<CsvRec[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to parse the CSV data
  const parseCSV = (csvText: string): CsvRec[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const values = line.split(',');
      const record: any = {};
      headers.forEach((header, i) => {
        record[header] = values[i];
      });
      return record;
    });
  };

  useEffect(() => {
    fetch("/collab_recommendations.csv") // Adjusted to match the CSV file name and location
      .then((res) => res.text())
      .then((text) => setCfData(parseCSV(text)));
  }, []);

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(e.target.value);
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const index = itemIds.indexOf(Number(selectedItemId));

      // Collaborative Filtering
      const cfRow = cfData[index];
      setCfRecs(cfRow ? Object.values(cfRow) : []);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>News Article Recommendations</h1>

      <label>Select Item ID: </label>
      <select value={selectedItemId} onChange={handleSelectItem}>
        <option value="">-- Select an Item --</option>
        {itemIds.map((id) => (
          <option key={id} value={id.toString()}>
            {id}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={getRecommendations} disabled={loading}>
        Get Collaborative Filtering Recommendations
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Collaborative Filtering</h2>
        {cfRecs.length > 0 && (
          <>
            <p><strong>If you watched:</strong> {cfRecs[0]}</p>
            <h5>Top Recommendations:</h5>
            <ol>
              {cfRecs.slice(1).map((id, idx) => (
                <li key={idx}>{id}</li>
              ))}
            </ol>
          </>
        )}
      </div>

      {/* Content Recommender */}
      <ContentRecommender contentId={selectedItemId} />
    </div>
  );
};

export default App;
