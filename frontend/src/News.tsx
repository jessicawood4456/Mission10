import { useState } from 'react';

function News() {
  const itemIds = [
    8890720798209849000, 310515487419367000, 3460026829794173000,
    7763750328910543000, 2372438485070148600, 372531153711028300,
    6521856301289868000, 1441248639512899600, 4306804750094230000,
    1582315529508020200,
  ]; // Hardcoded item IDs
  const [selectedItem, setSelectedItem] = useState('');
  const userId = 1908339160857512700;

  return (
    <>
      <h1>News Articles Recommender</h1>
      <label>Select Item Id: </label>
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        <option value="">-- Select an Item --</option>
        {itemIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </>
  );
}

export default News;
