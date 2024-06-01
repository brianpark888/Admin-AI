import React, {useState, useEffect} from 'react';
import {db} from '@/firebase';
import {doc, collection, getDocs, getDoc} from 'firebase/firestore'

function DataTable({ formId }) {


  const [formDetails, setFormDetails] = useState(null);
  const [responses, setResponses] = useState([{answer: '', email: '', name: '', submittedAt: ''}]);


  useEffect(() => {
    const fetchData = async () => {
      const formDocRef = doc(db, 'forms', formId);
      
      const formSnapshot = await getDoc(formDocRef);
      
      const responsesRef = collection(formDocRef, 'submissions');
      const responseSnapshot = await getDocs(responsesRef);
      const loadedResponses = responseSnapshot.docs.map(doc => doc.data());
      setResponses(loadedResponses);
    };

    fetchData();
  }, [formId]);

  // 각 Answer 항목의 표시 여부를 관리하기 위한 상태(state) 정의
  const [expandedRows, setExpandedRows] = useState([]);

  // 특정 인덱스의 Answer 항목의 표시 여부를 토글하는 함수
  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      // 이미 표시된 상태라면 숨김
      const indexToRemove = newExpandedRows.indexOf(index);
      newExpandedRows.splice(indexToRemove, 1);
    } else {
      // 표시되지 않은 상태라면 표시
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };



  
  return (
    <table className="min-w-full divide-y divide-gray-200 border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="border-b border-r px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
          <th className="border-b border-r px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
          <th className="border-b px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {responses.map((response, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="border-b border-r px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.name}</td>
              <td className="border-b border-r px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.email}</td>
              <td className="border-b px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  className="text-blue-500 underline"
                  onClick={() => toggleRow(index)} // 클릭 이벤트 추가
                >
                  {expandedRows.includes(index) ? 'Hide' : 'Show'} Response
                </button>
                {/* 각 Answer 항목의 표시 여부에 따라 내용을 표시 또는 숨김 */}
                {expandedRows.includes(index) && (
                  <div className="mt-2">{response.answer}</div>
                )}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>  
  );
}

export default DataTable;
