import React from 'react';
import { Link } from 'react-router-dom';

const DownloadCSV = () => {
  const linkStyle = {
    backgroundColor: '#2c2c2c',
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    display: 'inline-block', 
  };

  return (
    <div>
      <Link to="/Book1.csv" target="_blank" download style={linkStyle}>Download Sample CSV</Link>
    </div>
  );
}

export default DownloadCSV;
