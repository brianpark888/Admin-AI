import { Form } from 'react-router-dom';
import Button from '../Components/button'; // Ensure the path is correct based on your project structure
import Navbar from '../Components/NavigationBar'; 
import RoundedBox from '@/Components/RoundedBox';
import ListItem from '@/Components/CreateForm';
import ShowForm from '@/Components/ShowForm';


export default function Home() {
  // Function to handle button click
  const handleClick = () => {
    alert('Handling admin tasks!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
    </div>
  );
}
