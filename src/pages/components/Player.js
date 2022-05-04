import React, { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';

/**
 * Fonction qui affiche le player
 * 
 * @param  {} {accessTokenDirect
 * @param  {} trackUri}
 */
export const Player = ({accessTokenDirect, trackUri}) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true);
    }, [trackUri])

    return <SpotifyWebPlayer 
        token={accessTokenDirect}
        uris={trackUri}
        play={play}
        autoPlay={play}
        callback={state => { 
            if(!state.isPlaying){
                setPlay(false);
            }
        }}
        magnifySliderOnHover={true}
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            sliderHandleColor: '#1cb954',
            sliderTrackColor: '#000',
            trackArtistColor: '#bbb',
            trackNameColor: '#fff',
        }}
    />
}