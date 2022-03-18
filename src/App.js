import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
    const [token, setToken] = useState('')
    const [credentials, setCredentials] = useState({id: '951cfe0487e5452895e043940fa541c4', secret: '7414c33b10454bab9502e44a67da2794'})

    let test = credentials.id + ':' + credentials.secret;

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + test.toString('base64')
            },
            data: 'grant_type=client_credentials', 
            method: 'POST'
        })
        .then(tokenResponse => {
            console.log(tokenResponse.data.access_token);
            setToken(tokenResponse.data.access_token);
        });
    }, []);

  return (
    <main className='unselectable' style={{height: window.screen.height}}>
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: 280}}>
            <span className="fs-4 text-white"><i className="fa fa-music" aria-hidden="true" style={{color: '#80ff80'}}/>&nbsp;&nbsp;Scuffedify</span>
            <hr/>
            <ul className="nav flex-column mb-auto">
                <li>
                    <a href="#" className="nav-link active" aria-current="page">
                    <i className="fa fa-home" aria-hidden="true"></i> Accueil
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    <i className="fa fa-search" aria-hidden="true"></i> Parcourir
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    <i className="fa fa-podcast" aria-hidden="true"></i> Radio   
                    </a>
                </li>
                <br/>
                <li className='sidebar-header-text'>
                    BIBLIOTHÈQUE
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Conçu pour vous
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Écouté récemment
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Titres
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Albums
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Artistes
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Radios
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Podcasts
                    </a>
                </li>
                <br/>
                <li className='sidebar-header-text'>
                    PLAYLISTS
                </li>
                <li>
                    <a href="#" className="nav-link">
                    Playlist #1
                    </a>
                </li>
                <hr className='align-self-end'/>
                
            </ul>
            <ul className='nav nav-pills'>
                <li className='align-self-end'>
                    <a href="#" className="nav-link">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Créer une playlist
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width={45} height={45} className="rounded-circle me-2"/>
                    <strong>Pseudo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">Private Session</a></li>
                    <li><a className="dropdown-item" href="#">Account</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                </ul>
            </div>
        </div>
        <div className='music-page text-white bg-dark bg-gradient'>
            <div className='normalAlignement'>

                <div className='searchBar'>
                    <div className="ui left icon input">
                        <i className="search icon"></i>
                        <input type="text" placeholder="Rechercher..."/>
                    </div>
                </div>


                <div className='music-page-section'>
                    <div className='title'>Titre de la section</div>
                    <div className='description'>Description de la section blablablablablablablabla</div>
                    <hr/>
                    <div className="ui cards">
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className="image">
                                <img src="https://github.com/mdo.png"/>
                            </div>
                            <div className="content">
                                <a className="header">Some title</a>
                                <div className="meta">
                                    <span className="date">Some stuff</span>
                                </div>
                            </div>
                            <div className="extra content">
                                <button className='btn fa fa-heart-o'></button>
                                <button className='btn fa fa-play-circle'></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div className='player text-white fixed-bottom'>Player</div>
    </main>
  );
}

export default App;
