import React from "react";

export const Titres = () => {
    return (
        <div className="noSection">
            <h1>Titres</h1>
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
