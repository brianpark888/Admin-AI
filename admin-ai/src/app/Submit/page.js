import {React} from 'react';
import Navbar from '@/Components/NavigationBar';
import DisplayForm from '@/Components/DisplayForm';

export default function Home() {
    return(<>
        <Navbar />
        <div>
            <h1>Home</h1>
            <DisplayForm formName="as" formQuestion="asd" />
        </div>
    </>
        
    )
}