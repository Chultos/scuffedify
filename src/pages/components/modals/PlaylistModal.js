import React from 'react';
import { Modal } from 'react-bootstrap';
import { createPlaylist } from '../../../app/slices/spotifySlice';

/**
 * Fonction qui affiche le modal des playlists
 * 
 * @param  {} props
 * @param  {} dispatch
 * @param  {} user
 * @param  {} setUpdateOnChange
 * @param  {} updateOnChange
 */
export const PlaylistModal = ({props, dispatch, user, setUpdateOnChange, updateOnChange}) => {
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
                    <button type="button" className="cancel-btn" onClick={props.onHide}>Annuler</button>

                    <button type="button" className="green-button-big" onClick={() => {
                        //Requete api pour créer la playlist
                        const handlePlaylistCreation = async() => {
                            await dispatch(
                                createPlaylist({
                                    userId: user.id,
                                    playlistName: document.getElementById('playlistTitleInput').value,
                                    playlistDescription: document.getElementById('playlistDescriptionInput').value,
                                })
                            );
                            
                            setUpdateOnChange(!updateOnChange);
                        }
                        
                        handlePlaylistCreation();
                        props.onHide();
                    }}>Créer</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};