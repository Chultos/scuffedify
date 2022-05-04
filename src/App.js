import './App.css';
import { useEffect, useState } from 'react';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './app/slices/spotifySlice';

/**
 * Fonction qui affiche l'application
 */
function App() {
    const [credentials, setCredentials] = useState({id: '951cfe0487e5452895e043940fa541c4', secret: '7414c33b10454bab9502e44a67da2794'})
    const [login, setLogin] = useState(false);
    const [accessTokenDirect, setAccessTokenDirect] = useState();
    const dispatch = useDispatch();

    function getAccessTokenFromUrl() {
        return window.location.hash.substring(1).split('&').reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            
            return initial;
        }, {});
    }

    useEffect(() => {
        let accessToken = getAccessTokenFromUrl();
        window.location.hash = '';

        if (accessToken.access_token) {
            dispatch(
                setAccessToken({
                    accessToken: accessToken.access_token
                })
            );
            setAccessTokenDirect(accessToken.access_token);
            setLogin(true);
        }
    }, [])

    if(login === false) {
        return(<LoginPage credentials={credentials}/>);
    } else {
        return (<MainPage setLogin={setLogin} accessTokenDirect={accessTokenDirect}/>);
    }
}

export default App;
