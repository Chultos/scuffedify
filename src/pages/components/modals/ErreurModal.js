import React from 'react';
import { Modal } from 'react-bootstrap';

/**
 * Fonction qui affiche le modal d'erreur
 * 
 * @param  {} {props}
 */
export const ErreurModal = ({props}) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Une erreur est survenue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Si l'erreur persiste, veuillez vérifier votre connexion et rafraîchir l'application</p>
            </Modal.Body>
            <Modal.Footer>
                <div className='divBtn'>
                    <button type="button" className="green-button-big btn" onClick={props.onHide}>Ok</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};