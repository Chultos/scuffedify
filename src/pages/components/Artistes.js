import React, { useMemo } from "react";

/**
 * Fonction pour afficher la page des artistes
 * 
 * @param  {} {artistes}
 */
export const Artistes = ({artistes}) => {
    const DisplayArtists = useMemo(() => {
        return artistes.items.map((artiste, index) => {
            return <div key={index} className="card artiste">
                    <div className="image">
                        <img alt="Couverture" src={artiste.images[2].url} />
                    </div>
                    <div className="content">
                        <div className="header">{artiste.name}</div>
                    </div>
                </div>;
        });
    }, [artistes]);

    //Affichage de la page
    return (
        <div className="noSection">
            <h1>Vos artistes préférés</h1>
            <div className="ui cards">
                {DisplayArtists}
            </div>
        </div>
    );
};
