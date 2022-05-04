import React, { useMemo } from "react";
import { addTrackToPlaylist } from "../../app/slices/spotifySlice";

/**
 * Fonction qui affiche la page Ecouté Recemment
 * 
 * @param  {} {ecouteRecemment
 * @param  {} dispatch
 * @param  {} playlists
 * @param  {} setCurrentTrackUri}
 */
export const EcouteRecemment = ({ecouteRecemment, dispatch, playlists, setCurrentTrackUri}) => {
    
    /**
     * Fonction qui affiche les playlists dans le menu 'ajouter chanson dans une playlist'
     * 
     * @param  {} trackUri
     */
    const displayPlaylistList = (trackUri) => {
        return playlists.items.map((playlist, index) => {
            return <li><div className="dropdown-item" onClick={() => dispatch(addTrackToPlaylist({playlistId: playlist.id, track: [trackUri]}))}>{playlist.name}</div></li>
        });
    };


    //Fonction qui affiche les tracks d'une playlist
    const DisplayTracks = useMemo(() => {
        return ecouteRecemment.items.map((track, index) => {
            let minutes = Math.floor(track.track.duration_ms / 60000);
            let seconds = Math.ceil((track.track.duration_ms / 1000) % 60);

            if(seconds < 10) {
                seconds = '0' + seconds;
            }

            let artistNames = track.track.album.artists[0].name;
                
            if(track.track.artists.length > 1) {
                let skipFirst = true;

                for(let artistNames of track.track.artists) {
                    if(!skipFirst) {
                        artistNames += ', ' + artistNames.name;
                    } else {
                        skipFirst = false;
                    }
                }
            }

            return <tr key={index}>
                <td><i className="play circle outline icon player-usable-icon" onClick={() => handlePlay(track.track.uri)}></i></td>
                <td>
                    <div className="dropdown">
                        <div className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                            <i class="fa fa-plus-circle player-usable-icon"></i>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            {displayPlaylistList(track.track.uri)}
                        </ul>
                    </div>
                </td>
                <td>{track.track.name}</td>
                <td>{artistNames}</td>
                <td className="small-album-image"><img alt="Couverture de l'album" src={track.track.album.images[0].url} /></td>
                <td>{track.track.album.name}</td>
                <td>{minutes + ':' + seconds}</td>
            </tr>;
        });
    }, [ecouteRecemment]);

    /**
     * Fonction qui permet de jouer une chanson
     * 
     * @param  {} trackUri
     */
    function handlePlay(trackUri) {
        setCurrentTrackUri(trackUri)
    }

    //Affichage de la page
    return (
        <div className="noSection">
            <h1>Écouté récemment</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{width: '40px'}}></th>
                        <th scope="col" style={{width: '40px'}}></th>
                        <th scope="col">Titre</th>
                        <th scope="col">Artiste</th>
                        <th scope="col" style={{width: '40px'}}><i className="fa fa-picture-o"></i></th>
                        <th scope="col">Album</th>
                        <th scope="col"><i className="clock outline icon"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayTracks}
                </tbody>
            </table>
        </div>
    );
};
