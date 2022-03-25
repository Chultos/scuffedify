import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Albums } from './components/Albums';
import { Artiste } from './components/Artiste';
import { Artistes } from './components/Artistes';
import { ConcuPourVous } from './components/ConcuPourVous';
import { EcouteRecemment } from './components/EcouteRecemment';
import { Home } from './components/Home';
import { Player } from './components/Player';
import { Playlist } from './components/Playlist';
import { Recherche } from './components/Recherche';
import { Sidebar } from './components/Sidebar';
import { Titres } from './components/Titres';

export const MainPage = () => {

    //Ajouter playlists dans la variable
    const [modalShow, setModalShow] = useState(false);
    const [recherche, setRecherche] = useState('');
    const [sidebarOptions, setSidebarOptions] = useState({
        accueil: 'active',
        concuPourVous: '',
        ecouteRecemment: '',
        titres: '',
        albums: '',
        artistes: '',
        artiste: '',
        playlists: []
    });

    const [playlists, setPlaylists] = useState([{titre: 'Titres', description: 'desctitres', createur: 'Chultos', nbTitres: '46', duree: '4 hr 6 min'},
                                                {titre: 'playlist', description: 'descplaylist', createur: 'Jean', nbTitres: '22', duree: '2 hr 4 min'}]);
    
    useEffect(() => {
        let tempSidebarOptions = {...sidebarOptions};

        for (let key of Object.keys(playlists)) {
            tempSidebarOptions.playlists[key] = '';
        }
        
        setSidebarOptions(tempSidebarOptions);
    }, [playlists]);


    //Requete playlists
    

    function updateSidebar(newActiveOption, optionType = null) {
        let tempSidebarOptions = {...sidebarOptions};
        //Séparé en deux parties pour permettre de nommer une playlist "Titres" par exemple
        if(optionType === null) {
            for (let key of Object.keys(tempSidebarOptions)) {
                if(key !== 'playlists') {
                    if(key === newActiveOption) {
                        tempSidebarOptions[key] = 'active';
                    } else  {
                        tempSidebarOptions[key] = '';
                    }
                }
                for (let key of Object.keys(tempSidebarOptions.playlists)) {
                    tempSidebarOptions.playlists[key] = '';
                }
            }
        }

        if(optionType === 'playlist') {
            for (let key of Object.keys(tempSidebarOptions)) {
                if(key !== 'playlists') {
                    tempSidebarOptions[key] = '';
                }
            }
            for (let key of Object.keys(tempSidebarOptions.playlists)) {
                if(key === newActiveOption) {
                    tempSidebarOptions.playlists[key] = 'active';
                } else {
                    tempSidebarOptions.playlists[key] = '';
                }
            }
        }

        setSidebarOptions(tempSidebarOptions)
    }

    const PageComponent = useMemo(() => {
        if(recherche === '') {
            if(sidebarOptions.accueil === 'active') {
                return <Home playlists={playlists} setPlaylists={setPlaylists}/>
            } else if(sidebarOptions.concuPourVous === 'active') {
                return <ConcuPourVous/>
            } else if(sidebarOptions.ecouteRecemment === 'active') {
                return <EcouteRecemment/>
            } else if(sidebarOptions.titres === 'active') {
                return <Titres/>
            } else if(sidebarOptions.albums === 'active') {
                return <Albums/>
            } else if(sidebarOptions.artistes === 'active') {
                return <Artistes/>
            } else if(sidebarOptions.artiste === 'active') {
                return <Artiste/>
            } else {
                //Check les playlists
                for (let [key, value] of Object.entries(sidebarOptions.playlists)) {
                    if(value === 'active') {
                        return <Playlist playlist={playlists[key]}/>
                    }
                }
            }
        } else {
            return <Recherche/>
        }
    }, [sidebarOptions, recherche, playlists]);

    useEffect(() => {
        if(recherche !== '') {
            
        }
    }, [recherche]);

    function PlaylistModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Création de Playlist
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row justify-content-md-center player-song-icons'>
                        <div className='col'>
                            <label htmlFor="playlistTitleInput" className="form-label login-form-label">Titre de la playlist</label>
                            <div className="input-group mb-3">
                                <input type="text" maxLength={100} className="form-control" placeholder="Titre de la playlist" id="playlistTitleInput" aria-describedby="basic-addon3"/>
                            </div>

                            <label htmlFor="playlistDescriptionInput" className="form-label login-form-label">Description</label>
                            <div className="input-group mb-3">
                                <textarea className="form-control creaPlaylist-txtarea" maxLength={300} rows='5' id="playlistDescriptionInput" placeholder="Description"></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='divBtn'>
                        <button type="button" className="cancel-btn btn" onClick={props.onHide}>Annuler</button>

                        <button type="button" className="green-button-big btn" onClick={() => {
                            //Requete api pour créer la playlist
                            updateSidebar(document.getElementById('playlistTitleInput').value)
                        }}>Créer</button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <main className='unselectable' style={{height: window.screen.height}}>
            <Sidebar sidebarOptions={sidebarOptions} updateSidebar={updateSidebar} playlists={playlists} setModalShow={setModalShow} />
            <div className="music-page text-white bg-dark bg-gradient">
                <div className="normalAlignement">
                    <div className="searchBar">
                        <div className="ui left icon input right action">
                            <i className="search icon"></i>
                            <input id='inputRecherche' onChange={(e) => {setRecherche(e.target.value)}} type="text" placeholder="Rechercher..." />
                            <button className="ui icon button" onClick={() => {document.getElementById('inputRecherche').value = ''; setRecherche('')}}><i className="close icon"/></button>
                        </div>
                    </div>
                    {PageComponent}
                </div>
            </div>
            <Player />
            <PlaylistModal show={modalShow} onHide={() => {setModalShow(false)}} />
        </main>
    );
}