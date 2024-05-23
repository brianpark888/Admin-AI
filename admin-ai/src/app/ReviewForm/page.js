
"use client";
import TableComponent from '../../Components/TableComponent';
import InputComponent from '../../Components/InputComponent';

const data = [
  { name: 'John Doe', email: 'john@example.com' ,email1: 'john@example.com'},
  { name: 'Jane Smith', email: 'jane@example.com',email1: 'john@example.com' },
  { name: 'Bob Johnson', email: 'bob@example.com' ,email1: 'john@example.com'}
];
export default function Home() {
    return (
      <div>
        <h1>Review Form</h1>
        <TableComponent data={data}/>
        <InputComponent/>
      </div>
    );
  }
  