import React from 'react';

function DataTable() {
  // Sample data
  const data = [
    { name: "Alice", email: "alice@example.com", answer: "Yes" },
    { name: "Bob", email: "bob@example.com", answer: "No" },
    { name: "Charlie", email: "charlie@example.com", answer: "Maybe" }
  ];

return (
    <table style={{borderCollapse: 'collapse', width: '100%'}}>
        <thead>
            <tr>
                <th style={{border: '1px solid black', padding: '8px', backgroundColor: 'lightgray'}}>Name</th>
                <th style={{border: '1px solid black', padding: '8px', backgroundColor: 'lightgray'}}>Email</th>
                <th style={{border: '1px solid black', padding: '8px', backgroundColor: 'lightgray'}}>Answer</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td style={{border: '1px solid black', padding: '8px'}}>{item.name}</td>
                    <td style={{border: '1px solid black', padding: '8px'}}>{item.email}</td>
                    <td style={{border: '1px solid black', padding: '8px'}}>{item.answer}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
}

export default DataTable;
