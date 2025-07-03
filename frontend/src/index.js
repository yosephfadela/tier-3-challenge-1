import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load stats');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding: 32}}>Loading...</div>;
  if (error) return <div style={{padding: 32, color: 'red'}}>{error}</div>;
  if (!stats) return null;

  return (
    <div style={{fontFamily: 'sans-serif', maxWidth: 900, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee'}}>
      <h1 style={{marginBottom: 8}}>Traffic Statistics Dashboard</h1>

        <div style={{display: 'flex', gap: 32, marginBottom: 32}}>
            <div style={{flex: 1, background: '#f6f8fa', borderRadius: 8, padding: 24, textAlign: 'center'}}>
              <div style={{fontSize: 18, color: '#888'}}>Completed Transactions</div>
              <div style={{fontSize: 32, fontWeight: 700}}>{stats.completedTransactions}</div>
            </div>
            <div style={{flex: 1, background: '#f6f8fa', borderRadius: 8, padding: 24, textAlign: 'center'}}>
                <div style={{fontSize: 18, color: '#888'}}>Visitors</div>
                <div style={{fontSize: 32, fontWeight: 700}}>{stats.visitors}</div>
            </div>
      </div>

      <h2 style={{margin: '32px 0 16px'}}>Average Order Value (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={stats.avgOrderValue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{fontSize: 12}} minTickGap={4} />
          <YAxis tick={{fontSize: 12}} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <h2 style={{margin: '32px 0 16px'}}>Sales by Country</h2>
      <table style={{width: '100%', borderCollapse: 'collapse', background: '#f6f8fa', borderRadius: 8}}>
        <thead>
          <tr style={{background: '#e3e8ee'}}>
            <th style={{padding: 8, textAlign: 'left'}}>Country</th>
            <th style={{padding: 8, textAlign: 'right'}}>Sales ($)</th>
              <th style={{padding: 8, textAlign: 'right'}}>Trans</th>

          </tr>
        </thead>
        <tbody>
          {stats.salesByCountry.map(row => (
            <tr key={row.countryName}>
              <td style={{padding: 8}}>{row.countryName}</td>
              <td style={{padding: 8, textAlign: 'right'}}>{row.sales.toLocaleString()}</td>
              <td style={{padding: 8, textAlign: 'right'}}>{row.numberOfTransactions.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
