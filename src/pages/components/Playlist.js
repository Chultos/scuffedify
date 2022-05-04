import React, { useMemo } from "react";
import { removeTrackFromPlaylist } from "../../app/slices/spotifySlice";

/**
 * Fonction pour afficher la page d'une playlist
 * 
 * @param  {} {playlist
 * @param  {} setCurrentTrackUri
 * @param  {} dispatch
 * @param  {} setLastFetchedPlaylist
 * @param  {} setPlaylist}
 */
export const Playlist = ({playlist, setCurrentTrackUri, dispatch, setLastFetchedPlaylist, setPlaylist}) => {

    /**
     * Fonction qui permet de jouer une chanson
     * 
     * @param  {} trackUri
     */
    function handlePlay(trackUri) {
        setCurrentTrackUri(trackUri)
    }
    /**
     * Fonction qui permet de supprimer une chanson de la playlist
     * 
     * @param  {} parameters
     */
    function handleRemove(parameters) {
        const asyncDispatch = async () => {
            await dispatch(
                removeTrackFromPlaylist({playlistId: parameters.playlistId, trackUri: parameters.trackUri})
            );
            setLastFetchedPlaylist('')
            setPlaylist('')
        }
        
        asyncDispatch();
    }

    //Fonction qui affiche les tracks d'une playlist
    const DisplayTracks = useMemo(() => {
        if (playlist && playlist.tracks.items.length > 0) {
            return playlist.tracks.items.map((track, index) => {
                //Traitement des données
                let minutes = Math.floor(track.track.duration_ms / 60000);
                let seconds = Math.ceil((track.track.duration_ms / 1000) % 60);

                let dateAjout = new Date(track.added_at);

                let mois = dateAjout.getMonth() + 1;
                if(mois < 10) {
                    mois = '0' + mois;
                }

                let jours = dateAjout.getDate();
                if(jours < 10) {
                    jours = '0' + jours;
                }

                let dateAjoutFormatee = dateAjout.getFullYear() + '-' + mois + '-' + jours;

                if(seconds < 10) {
                    seconds = '0' + seconds;
                }

                let artistNames = track.track.album.artists[0].name;
                
                if(track.track.artists.length > 1) {
                    let skipFirst = true;
    
                    for(let artiste of track.track.artists) {
                        if(!skipFirst) {
                            artistNames += ', ' + artiste.name;
                        } else {
                            skipFirst = false;
                        }
                    }
                }

                //Affichage des tracks
                return <tr key={index}>
                    <td><i className="play circle outline icon player-usable-icon" onClick={() => handlePlay(track.track.uri)}></i></td>
                    <td>{track.track.name}</td>
                    <td>{artistNames}</td>
                    <td className="small-album-image"><img alt="Couverture de l'album" src={track.track.album.images[0].url} /></td>
                    <td>{track.track.album.name}</td>
                    <td>{dateAjoutFormatee}</td>
                    <td>{minutes + ':' + seconds}</td>
                    <td><i class="fa fa-minus-circle player-usable-icon" onClick={() => handleRemove({playlistId: playlist.id, trackUri: track.track.uri})}></i></td>
                </tr>;
            });
        }
    }, [playlist]);

    //Affichage de la page
    const DisplayPage = useMemo(() => {
        if(playlist && playlist.tracks.items.length > 0) {
            return (
                <div className="noSection">
                    <div className="row">
                        <div className="col-sm-2">
                            <img className="playlist-logo" alt="Couverture" src={playlist.images[0].url}/>
                        </div>
                        <div className="col-md-8">
                            <div className="playlist-titre">{playlist.name}</div>
                            <div className="playlist-description">{playlist.description}</div>
                            <div className="playlist-details">Créé par <div className="playlist-createur">{playlist.owner.display_name}</div> | {playlist.tracks.total} titres</div>
                        </div>
                    </div>
                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '40px'}}></th>
                                <th scope="col">Titre</th>
                                <th scope="col">Artiste</th>
                                <th scope="col" style={{width: '40px'}}><i className="fa fa-picture-o"></i></th>
                                <th scope="col">Album</th>
                                <th scope="col"><i className="calendar alternate outline icon"></i></th>
                                <th scope="col"><i className="clock outline icon"></i></th>
                                <th scope="col" style={{width: '40px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayTracks}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="noSection">
                    <h1>Playlist vide</h1>
                </div>
            );
        }
    }, [playlist]);

    return DisplayPage;
}
