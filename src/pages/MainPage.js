import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMyRecentlyPlayed, fetchMyTopArtists, fetchMyTopTracks, fetchPlaylist, fetchPlaylists, fetchPlaylistTracks, fetchSearchResults, fetchUser, setAccessToken } from '../app/slices/spotifySlice';
import { Artistes } from './components/Artistes';
import { EcouteRecemment } from './components/EcouteRecemment';
import { Home } from './components/Home';
import { Player } from './components/Player';
import { Playlist } from './components/Playlist';
import { Recherche } from './components/Recherche';
import { Sidebar } from './components/Sidebar';
import { Titres } from './components/Titres';
import { cloneDeep } from 'lodash';
import { PlaylistModal } from './components/modals/PlaylistModal';
import { ErreurModal } from './components/modals/ErreurModal';
import { NoPremium } from './components/NoPremium';
/**
 * Fonction qui gère l'affichage des différents composants
 * 
 * @param  {} {setLogin
 * @param  {} accessTokenDirect}
 */
export const MainPage = ({setLogin, accessTokenDirect}) => {

    //Déclaration des variables
    const dispatch = useDispatch();
    const [playlistModalShow, setPlaylistModalShow] = useState(false);
    const [erreurModalShow, setErreurModalShow] = useState(false);
    const [sidebarOptions, setSidebarOptions] = useState({
        accueil: 'active',
        concuPourVous: '',
        ecouteRecemment: '',
        titres: '',
        artistes: '',
        artiste: '',
        playlists: []
    });

    //Variables API
    const [user, setUser] = useState();
    const [playlists, setPlaylists] = useState({items: [{name: ''}]});
    const [recherche, setRecherche] = useState('');
    const [resultatsRecherche, setResultatsRecherche] = useState();
    const [lastRecherche, setLastRecherche] = useState('');

    const [ecouteRecemment, setEcouteRecemment] = useState();
    const [titres, setTitres] = useState();
    const [artistes, setArtistes] = useState();
    const [playlist, setPlaylist] = useState();
    const [lastFetchedPlaylist, setLastFetchedPlaylist] = useState('');
    const [currentTrackUri, setCurrentTrackUri] = useState();
    
    //Variable pour mettre à jour des components manuellement
    const [updateOnChange, setUpdateOnChange] = useState(false);


    //Récupération des données de l'utilisateur
    useEffect(() => {
        const getBasicData = async() => {
            const playlistsRequete = await dispatch(fetchPlaylists());

            if(!playlistsRequete.payload) {
                setErreurModalShow(true);
                return
            }

            setPlaylists(playlistsRequete.payload);

            const userRequete = await dispatch(fetchUser());

            if(!userRequete.payload) {
                setErreurModalShow(true);
                return
            }

            if(userRequete.payload.images.length === 0) {
                //Si l'utilisateur n'a pas d'image de profil, on affiche une image par défaut
                let userClone = cloneDeep(userRequete.payload);
                userClone.images = [{url: './images/default_profile_image.png'}];

                setUser(userClone);
            } else {
                setUser(userRequete.payload);
            }
        }

        getBasicData();
  }, [dispatch, updateOnChange]);

  useEffect(() => {
        console.log(user);
    }, [user]);
    
    //Affichage des playlists dans la sidebar
    useEffect(() => {
        let tempSidebarOptions = {...sidebarOptions};

        for (let key of playlists.items) {
            tempSidebarOptions.playlists[key.id] = '';
        }
        
        setSidebarOptions(tempSidebarOptions);
    }, [playlists, updateOnChange]);

    //Déconnexion
    function resetAllVariables() {
        setTitres(null);
        setArtistes(null);
        setEcouteRecemment(null);
        setPlaylist(null);
        setAccessToken('');
        setLogin(false);
        updateSidebar('accueil');
    }

    /**
     * Fonction qui permet de changer l'onglet actif dans la sidebar
     * 
     * @param  {} newActiveOption
     * @param  {} optionType=null
     */
    function updateSidebar(newActiveOption, optionType = null) {
        let tempSidebarOptions = {...sidebarOptions};
        //Séparé en deux parties pour permettre de nommer une playlist "Titres" sans causer de problèmes
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

    //UseMemo qui affiche un component en fonction de l'onglet actif dans la sidebar
    //Fais également les requête API nécessaires
    const PageComponent = useMemo(() => {
        if(recherche === '') {
            if(sidebarOptions.accueil === 'active') { // ACCUEIL
                return <Home playlists={playlists} setPlaylists={setPlaylists}/>
            } else if(sidebarOptions.ecouteRecemment === 'active') { // ECOUTE RECEMMENT
                const getMyRecentlyPlayed = async() => {
                    const ecouteRecemmentRequete = await dispatch(fetchMyRecentlyPlayed());

                    if(!ecouteRecemmentRequete.payload) {
                        setErreurModalShow(true);
                        return
                    }

                    setEcouteRecemment(ecouteRecemmentRequete.payload);
                }

                if(ecouteRecemment) {
                    return <EcouteRecemment playlists={playlists} dispatch={dispatch} ecouteRecemment={ecouteRecemment} setCurrentTrackUri={setCurrentTrackUri} />
                } else {
                    getMyRecentlyPlayed();
                }
            } else if(sidebarOptions.titres === 'active') { // TITRES
                const getMyTopTracks = async() => {
                    let offset = 0;
                    const titresRequete = await dispatch(fetchMyTopTracks({offsetNumber: offset}));

                    if(!titresRequete.payload) {
                        setErreurModalShow(true);
                        return
                    }

                    let tempTitres = cloneDeep(titresRequete.payload);

                    while(tempTitres && (tempTitres.items.length < tempTitres.total)) {
                        offset += 50;
                        const titresRequete = await dispatch(fetchMyTopTracks({offsetNumber: offset}));
                        tempTitres.items.push(...titresRequete.payload.items);
                    }
                    setTitres(tempTitres);
                }

                if(titres) {
                    return <Titres titres={titres} dispatch={dispatch} playlists={playlists} setCurrentTrackUri={setCurrentTrackUri} />
                } else {
                    getMyTopTracks();
                }
            } else if(sidebarOptions.artistes === 'active') { // ARTISTES
                const getMyTopArtists = async() => {
                    let offset = 0;
                    const artistesRequete = await dispatch(fetchMyTopArtists({offsetNumber: offset}));

                    if(!artistesRequete.payload) {
                        setErreurModalShow(true);
                        return
                    }

                    let tempArtistes = cloneDeep(artistesRequete.payload);

                    while(tempArtistes && (tempArtistes.items.length < tempArtistes.total)) {
                        offset += 50;
                        const artistesRequete = await dispatch(fetchMyTopArtists({offsetNumber: offset}));
                        tempArtistes.items.push(...artistesRequete.payload.items);
                    }
                    setArtistes(tempArtistes);
                }

                if(artistes) {
                    return <Artistes artistes={artistes}/>
                } else {
                    getMyTopArtists();
                }
            } else { // PLAYLIST
                //Check les playlists
                for (let [key, value] of Object.entries(sidebarOptions.playlists)) {
                    if(value === 'active') {
                        const getPlaylist = async() => {
                            let offset = 0;
                            const playlistRequete = await dispatch(fetchPlaylist({playlist: key, offsetNumber: offset}));

                            if(!playlistRequete.payload) {
                                setErreurModalShow(true);
                                return
                            }

                            let tempPlaylist = cloneDeep(playlistRequete.payload);

                            while(tempPlaylist.tracks.items.length < tempPlaylist.tracks.total) {
                                offset += 100;
                                const playlistRequete = await dispatch(fetchPlaylistTracks({playlist: key, offsetNumber: offset}));
                                tempPlaylist.tracks.items.push(...playlistRequete.payload.items);
                            }
                            setPlaylist(tempPlaylist);
                        }
                    
                        if(lastFetchedPlaylist !== key) {
                            getPlaylist();
                            setLastFetchedPlaylist(key);
                        }

                        if(playlist) {
                            return <Playlist playlist={playlist} setCurrentTrackUri={setCurrentTrackUri} dispatch={dispatch} setLastFetchedPlaylist={setLastFetchedPlaylist} setPlaylist={setPlaylist}    />
                        }
                    }
                }
            }
        } else { // RECHERCHE
            const search = async() => {
                const searchRequete = await dispatch(fetchSearchResults(recherche));
                console.log(searchRequete.payload);
                if(!searchRequete.payload) {
                    setErreurModalShow(true);
                    return
                }

                setResultatsRecherche(searchRequete.payload);
            }

            if(recherche !== lastRecherche) {
                setResultatsRecherche(null);
                setLastRecherche(recherche);
                search();
            }

            if(resultatsRecherche) {
                return <Recherche resultatsRecherche={resultatsRecherche} setCurrentTrackUri={setCurrentTrackUri} dispatch={dispatch} playlists={playlists}/>
            } else {
                search();
            }
        }
    }, [sidebarOptions, recherche, resultatsRecherche, playlist, titres, artistes, ecouteRecemment]);

    //Fonction qui affiche l'application
    const DisplayApp = () => {
        if(user && user.product && user.product === "premium") {
            return (
                <main className='unselectable' style={{height: window.screen.height}}>
                    <Sidebar dispatch={dispatch} user={user} setErreurModalShow={setErreurModalShow} updateOnChange={updateOnChange} setUpdateOnChange={setUpdateOnChange} sidebarOptions={sidebarOptions} updateSidebar={updateSidebar} playlists={playlists} setPlaylistModalShow={setPlaylistModalShow} resetAllVariables={resetAllVariables} />
                    <div className="music-page text-white bg-dark bg-gradient">
                        <div className="normalAlignement">
                            <div className="searchBar">
                                <div className="ui left icon input right action">
                                    <i className="search icon"></i>
                                    <input id='inputRecherche' onChange={(e) => {setRecherche(e.target.value)}} type="text" placeholder="Rechercher..." autoComplete='off' />
                                    <button className="ui icon button" onClick={() => {document.getElementById('inputRecherche').value = ''; setRecherche('')}}><i className="close icon"/></button>
                                </div>
                            </div>
                            {PageComponent}
                        </div>
                    </div>
                    <div className='player'>
                        <Player trackUri={currentTrackUri}  accessTokenDirect={accessTokenDirect} />
                    </div>
                    <PlaylistModal props={{show: playlistModalShow, onHide: () => {setPlaylistModalShow(false)}}} dispatch={dispatch} user={user} setUpdateOnChange={setUpdateOnChange}  updateOnChange={updateOnChange} />
                    <ErreurModal props={{show: erreurModalShow, onHide: () => {setErreurModalShow(false)}}} />
                </main>
            );
        } else {
            return <NoPremium resetAllVariables={resetAllVariables} />
        }
    }

    return (
        DisplayApp()
    );
}