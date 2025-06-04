import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: '$10' },
    { id: 2, name: 'Item 2', price: '$20' },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={items} columns={columns} pageSize={5} />
    </div>
  );
}

export default Dashboard;
