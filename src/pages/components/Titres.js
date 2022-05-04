import React, { useMemo } from "react";
import { addTrackToPlaylist } from "../../app/slices/spotifySlice";

/**
 * Fonction qui affiche la page Titres
 * 
 * @param  {} {titres
 * @param  {} dispatch
 * @param  {} playlists
 * @param  {} setCurrentTrackUri}
 */
export const Titres = ({titres, dispatch, playlists, setCurrentTrackUri}) => {

    /**
     * Fonction qui permet de jouer une chanson
     * 
     * @param  {} trackUri
     */
    function handlePlay(trackUri) {
        setCurrentTrackUri(trackUri)
    }

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
        return titres.items.map((track, index) => {
            //Traitement des données
            let minutes = Math.floor(track.duration_ms / 60000);
            let seconds = Math.ceil((track.duration_ms / 1000) % 60);

            if(seconds < 10) {
                seconds = '0' + seconds;
            }

            let artistNames = track.artists[0].name;

            if(track.artists.length > 1) {
                let skipFirst = true;

                for(let artiste of track.artists) {
                    if(!skipFirst) {
                        artistNames += ', ' + artiste.name;
                    } else {
                        skipFirst = false;
                    }
                }
            }

            //Affichage des tracks
            return <tr key={index}>
                <td><i className="play circle outline icon player-usable-icon" onClick={() => handlePlay(track.uri)}></i></td>
                <td>
                    <div className="dropdown">
                        <div className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                            <i class="fa fa-plus-circle player-usable-icon"></i>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            {displayPlaylistList(track.uri)}
                        </ul>
                    </div>
                </td>
                <td>{track.name}</td>
                <td>{artistNames}</td>
                <td className="small-album-image"><img alt="Couverture de l'album" src={track.album.images[0].url} /></td>
                <td>{track.album.name}</td>
                <td>{minutes + ':' + seconds}</td>
            </tr>;
        });
    }, [titres]);

    //Affichage de la page
    return (
        <div className="noSection">
            <h1>Vos titres préférés</h1>
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
