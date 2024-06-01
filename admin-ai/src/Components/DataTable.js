"use client";
import React from 'react';

function DataTable() {
  const data = [
    { name: "Alice", email: "alice@example.com", answer: "Yes" },
    { name: "Bob", email: "bob@example.com", answer: "No" },
    { name: "Charlie", email: "charlie@example.com", answer: "Maybe" }
  ];

  return (
    <table className="min-w-full divide-y divide-gray-200 border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="border px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
          <th className="border px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
          <th className="border px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Answer</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.email}</td>
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.answer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
