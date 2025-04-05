import React, { useState, useEffect } from 'react';
import './App.css';

// ✅ Only use IDs that exist in the content-based dataset
const itemIds = [
    "-4.11035E+18",
    "-7.29229E+18",
    "-6.15185E+18",
    "2.44803E+18",
    "-2.82657E+18",
    "-2.1489E+18",
    "4.11919E+18",
    "-7.92602E+18",
  ];
  



type CsvRec = {
  [key: string]: string;
};

const NewsRecommender = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [cfRecs, setCfRecs] = useState<string[]>([]);
  const [cbRecs, setCbRecs] = useState<string[]>([]);
  const [cfData, setCfData] = useState<CsvRec[]>([]);
  const [cbData, setCbData] = useState<CsvRec[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseCSVWithId = (csvText: string): CsvRec[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line) => {
      const values = line.split(',');
      const rowId = values[0];
      const rowData: CsvRec = { contentId: rowId };
      for (let i = 1; i < headers.length; i++) {
        rowData[headers[i]] = values[i];
      }
      return rowData;
    });
  };

  useEffect(() => {
    fetch("/collab_recommendations.csv")
      .then((res) => res.text())
      .then((text) => setCfData(parseCSVWithId(text)));

    fetch("/content_filtering_recommendations.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseCSVWithId(text);
        setCbData(parsed);

        const ids = parsed.map((row) => row["contentId"]);
        console.log("Parsed contentIds:", ids);
      });
  }, []);

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(e.target.value);
  };

  const getRecommendations = () => {
    setLoading(true);
    setError('');

    try {
      const index = itemIds.indexOf(selectedItemId);

      // Collaborative Filtering
      const cfRow = cfData[index];
      setCfRecs(cfRow ? Object.values(cfRow).slice(1) : []);

      // Content-Based Filtering
      const cbRow = cbData.find((row) => row["contentId"] === selectedItemId);

      if (!cbRow) {
        setCbRecs([]);
        throw new Error("Matching contentId not found");
      }

      const similarityScores = { ...cbRow };
      delete similarityScores["contentId"];

      const sorted = Object.entries(similarityScores)
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
        .slice(0, 5)
        .map(([id]) => id);

      setCbRecs(sorted);
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
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <br /><br />
      <button onClick={getRecommendations} disabled={loading}>
        Get Recommendations
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '50px', marginTop: '30px' }}>
        <div>
          <h2>Collaborative Filtering</h2>
          {cfRecs.length > 0 ? (
            <ol>
              {cfRecs.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ol>
          ) : (
            <p>No recommendations yet.</p>
          )}
        </div>

        <div>
          <h2>Content-Based Filtering</h2>
          {cbRecs.length > 0 ? (
            <ol>
              {cbRecs.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ol>
          ) : (
            <p>No recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsRecommender;
