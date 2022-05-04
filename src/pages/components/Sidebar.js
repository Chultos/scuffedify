import React, { useMemo } from 'react';
import { deletePlaylist } from '../../app/slices/spotifySlice';

/**
 * Fonction qui affiche la sidebar
 * 
 * @param  {} {user
 * @param  {} dispatch
 * @param  {} updateOnChange
 * @param  {} setUpdateOnChange
 * @param  {} sidebarOptions
 * @param  {} updateSidebar
 * @param  {} playlists
 * @param  {} setPlaylistModalShow
 * @param  {} resetAllVariables}
 */
export const Sidebar = ({user, dispatch, updateOnChange, setUpdateOnChange, sidebarOptions, updateSidebar, playlists, setPlaylistModalShow, resetAllVariables}) => {

    //Affichage des playlists
    const afficherPlaylists = useMemo(() => {
        return (
            playlists.items.map((item, key) => {
                return (
                    <li key={key} onClick={() => {updateSidebar(item.id, 'playlist')}}>
                        <div className={"nav-link " + sidebarOptions.playlists[item.id]}>
                            {item.name}
                            <div className='delete-playlist-btn pull-right' onClick={() => {
                                const asyncDeletePlaylist = async () => {
                                    await dispatch(deletePlaylist(item.id));
                                    setUpdateOnChange(!updateOnChange);
                                };

                                asyncDeletePlaylist();
                            }}>X</div>
                        </div>
                    </li>
                );
            })
        );
    })

    //Affichage de la sidebar
    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: 280}}>
            <span className="fs-4 text-white"><i className="fa fa-music" aria-hidden="true" style={{color: '#1cb854'}}/>&nbsp;&nbsp;Scuffedify</span>
            <hr/>
            <ul className="nav flex-column mb-auto">
                <li onClick={() => {updateSidebar('accueil')}}>
                    <div className={"nav-link " + sidebarOptions.accueil}>
                        <i className="fa fa-home" aria-hidden="true"></i> Accueil
                    </div>
                </li>
                <br/>
                <li className='sidebar-header-text'>
                    BIBLIOTHÈQUE
                </li>
                <li onClick={() => {updateSidebar('ecouteRecemment')}}>
                    <div className={"nav-link " + sidebarOptions.ecouteRecemment}>
                    Écouté récemment
                    </div>
                </li>
                <li onClick={() => {updateSidebar('titres')}}>
                    <div className={"nav-link " + sidebarOptions.titres}>
                    Titres
                    </div>
                </li>
                <li onClick={() => {updateSidebar('artistes')}}>
                    <div className={"nav-link " + sidebarOptions.artistes}>
                    Artistes
                    </div>
                </li>
                <br/>
                <li className='sidebar-header-text'>
                    PLAYLISTS
                </li>
                {afficherPlaylists}
                <hr className='align-self-end'/>
                
            </ul>
            <ul className='nav nav-pills'>
                <li className='align-self-end' onClick={() => {setPlaylistModalShow(true)}}>
                    <div className="nav-link">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Créer une playlist
                    </div>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <div className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                    <img src={user['images'][0]['url']} alt="" width={45} height={45} className="rounded-circle me-2"/>
                    <strong>{user['display_name']}</strong>
                </div>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><div className="dropdown-item" onClick={() => resetAllVariables()}>Se déconnecter</div></li>
                </ul>
            </div>
        </div>
    );
}