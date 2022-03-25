import './App.css';
import { useState } from 'react';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';

function App() {
    const [login, setLogin] = useState(false);

    if(login === false) {
        return(<LoginPage setLogin={setLogin}/>);
    } else {
        return (<MainPage />);
    }
}

export default App;
