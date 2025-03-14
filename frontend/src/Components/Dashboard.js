import { useState, useEffect } from 'react';

// Example component (e.g., Dashboard.js)
const Dashboard = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/your-data-endpoint');
        
        // Check if response is ok
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
      
      {/* Display your data */}
      <div>
        {data.length > 0 ? (
          <ul>
            {data.map(item => (
              <li key={item._id}>{item.name} - {item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;