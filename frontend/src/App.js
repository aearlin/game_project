import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}


export default App;
