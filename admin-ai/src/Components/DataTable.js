import React from 'react';

function DataTable() {
  // Sample data
  const data = [
    { name: "Alice", email: "alice@example.com", answer: "Yes" },
    { name: "Bob", email: "bob@example.com", answer: "No" },
    { name: "Charlie", email: "charlie@example.com", answer: "Maybe" }
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.answer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
