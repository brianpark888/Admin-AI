import { Form } from 'react-router-dom';
import Button from '../Components/button'; // Ensure the path is correct based on your project structure
import Navbar from '../Components/NavigationBar'; 
import FormList from '../Components/FormList';


export default function Home() {
  // Function to handle button click
  const handleClick = () => {
    alert('Handling admin tasks!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1>Admin AI</h1>
      <p>Admin AI is a tool that helps you manage your admin tasks.</p>
      <Button />
      <FormList />
    </div>
  );
}
