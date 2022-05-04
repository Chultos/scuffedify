import React, { useMemo } from "react";
import { addTrackToPlaylist } from "../../app/slices/spotifySlice";

/**
 * Fonction qui affiche la page pendant une recherche
 * 
 * @param  {} {resultatsRecherche
 * @param  {} setCurrentTrackUri
 * @param  {} dispatch
 * @param  {} playlists}
 */
export const Recherche = ({resultatsRecherche, setCurrentTrackUri, dispatch, playlists}) => {

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

    //Fonction qui affiche les résultats de la recherche
    const DisplayRecherche = useMemo(() => {
        return resultatsRecherche.tracks.items.map((track, index) => {
            //Traitement des données
            let artistNames = track.album.artists[0].name;
                
            if(track.artists.length > 1) {
                let skipFirst = true;

                for(let artistNames of track.artists) {
                    if(!skipFirst) {
                        artistNames += ', ' + artistNames.name;
                    } else {
                        skipFirst = false;
                    }
                }
            }

            //Affichage des tracks
            return (
                <div key={index} className="card">
                    <div className="image">
                        <img alt="Couverture" src={track.album.images[0].url} />
                    </div>
                    <div className="content">
                        <div className="header">{track.name}</div>
                        <div className="meta">
                            <span className="description">{artistNames}</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <i className="play circle outline icon player-usable-icon" onClick={() => handlePlay(track.uri)}></i>
                        <div className="dropdown" style={{display: "inline-block"}}>
                            <div className="text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                                <i class="fa fa-plus-circle player-usable-icon"></i>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                {displayPlaylistList(track.uri)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        });
    }, [resultatsRecherche]);

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
        <>
            <div className="noSection">
                <h2>Titres les plus pertinents</h2>
                <div className="ui cards">
                    {DisplayRecherche}
                </div>
            </div>
        </>
    );
};
