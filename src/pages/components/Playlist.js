import React from "react";

export const Playlist = ({playlist}) => {
    return (
        <div className="noSection">
            <div className="row">
                <div className="col-sm-2">
                    <img className="playlist-logo" alt="Couverture" src="https://github.com/mdo.png"/>
                </div>
                <div className="col-md-8">
                    <div className="playlist-titre">{playlist.titre}</div>
                    <div className="playlist-description">{playlist.description}</div>
                    <div className="playlist-details">Créé par <div className="playlist-createur">{playlist.createur}</div> | {playlist.nbTitres} titres, {playlist.duree}</div>
                </div>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{width: '40px'}}></th>
                        <th scope="col" style={{width: '40px'}}></th>
                        <th scope="col">Titre</th>
                        <th scope="col">Artiste</th>
                        <th scope="col">Album</th>
                        <th scope="col"><i className="calendar alternate outline icon"></i></th>
                        <th scope="col"><i className="clock outline icon"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i className="play circle outline icon player-usable-icon"></i></td>
                        <td><i className="btn text-white fa fa-heart-o"></i></td>
                        <td>Bleed it out</td>
                        <td>Linkin Park</td>
                        <td>No clue</td>
                        <td>9999-99-99</td>
                        <td>05:52</td>
                    </tr>
                    <tr>
                        <td><i className="play circle outline icon player-usable-icon"></i></td>
                        <td><i className="btn text-white fa fa-heart"></i></td>
                        <td>Bleed it out</td>
                        <td>Linkin Park</td>
                        <td>No clue</td>
                        <td>9999-99-99</td>
                        <td>05:52</td>
                    </tr>
                    <tr>
                        <td><i className="play circle outline icon player-usable-icon"></i></td>
                        <td><i className="btn text-white fa fa-heart-o"></i></td>
                        <td>Bleed it out</td>
                        <td>Linkin Park</td>
                        <td>No clue</td>
                        <td>9999-99-99</td>
                        <td>05:52</td>
                    </tr>
                    <tr>
                        <td><i className="play circle outline icon player-usable-icon"></i></td>
                        <td><i className="btn text-white fa fa-heart-o"></i></td>
                        <td>Bleed it out</td>
                        <td>Linkin Park</td>
                        <td>No clue</td>
                        <td>9999-99-99</td>
                        <td>05:52</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
