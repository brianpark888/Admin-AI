import React, {useState, useEffect} from 'react';
import {db} from '@/firebase';
import {doc, collection, getDocs, getDoc} from 'firebase/firestore'

function DataTable({ formId }) {


  const [formDetails, setFormDetails] = useState(null);
  const [responses, setResponses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const formDocRef = doc(db, 'forms', formId);
      
      // Fetching the form details
      const formSnapshot = await getDoc(formDocRef);
      if (formSnapshot.exists()) {
        setFormDetails(formSnapshot.data());
      } else {
        console.log("No such form!");
      }
      
      // Fetching the responses subcollection
      const responsesRef = collection(formDocRef, 'responses');
      const responseSnapshot = await getDocs(responsesRef);
      const loadedResponses = responseSnapshot.docs.map(doc => doc.data());
      setResponses(loadedResponses);
    };

    fetchData();
  }, [formId]);


  
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
        {/* {data.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.email}</td>
            <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.answer}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}

export default DataTable;
