import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, collection, getDocs } from 'firebase/firestore';

function DataTable({ formId }) {
  const [responses, setResponses] = useState([{ name: '', email: '', answer: '' }]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const formDocRef = doc(db, 'forms', formId);
      const responsesRef = collection(formDocRef, 'submissions');
      const responseSnapshot = await getDocs(responsesRef);
      const loadedResponses = responseSnapshot.docs.map(doc => doc.data());
      setResponses(loadedResponses);
    };

    fetchData();
  }, [formId]);

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      const indexToRemove = newExpandedRows.indexOf(index);
      newExpandedRows.splice(indexToRemove, 1);
    } else {
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const toggleSelectRow = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      const indexToRemove = newSelectedRows.indexOf(index);
      newSelectedRows.splice(indexToRemove, 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const toggleSelectAllRows = () => {
    if (selectedRows.length === responses.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(responses.map((_, index) => index));
    }
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 border-collapse">
        <thead className="bg-gray-50">
          <tr>

            <th className="border-b border-r px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
              Name
            </th>
            <th className="border-b border-r px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
              Email
            </th>
            <th className="border-b px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
              Response
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {responses.map((response, index) => (
            <React.Fragment key={index}>
              <tr className={selectedRows.includes(index) ? 'bg-slate-100' : ''}>
  
                <td className="border-b border-r text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {response.name}
                </td>
                <td className="border-b border-r text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {response.email}
                </td>
                <td className="border-b px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="whitespace-pre-wrap">
                    {response.answer.length > 70 && !expandedRows.includes(index)
                      ? `${response.answer.substring(0, 70)}...`
                      : response.answer}
                    {response.answer.length > 70 && (
                      <button
                        className="text-blue-500 underline ml-2"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRows.includes(index) ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DataTable;
