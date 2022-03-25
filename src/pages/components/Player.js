import React, { useEffect, useState } from 'react';

export const Player = () => {

    const [volume, setVolume] = useState(50);
    const [oldVolume, setOldVolume] = useState(0);
    const [muteBool, setMuteBool] = useState(true)
    useEffect(() => {
        if(volume > 0) {
            setMuteBool(true);
        }

        if(volume >= 50) {
            document.getElementById('soundIcon').className = 'volume up icon';
        } else if(volume > 0 && volume < 50) {
            document.getElementById('soundIcon').className = 'volume down icon';
        } else {
            document.getElementById('soundIcon').className = 'volume off icon';
        }
    }, [volume]);

    function muteSound(etat) {
        console.log(volume, oldVolume)
        if(etat === true) {
            setOldVolume(volume)
            setVolume(0)
            setMuteBool(false)
            document.getElementById('soundRange').value = 0;
        } else {
            setVolume(oldVolume)
            setMuteBool(true)
            document.getElementById('soundRange').value = oldVolume;
        }
    }

    return (
        <div className='player row text-white fixed-bottom'>
            <div className='col-md-3'>
                <img className='player-image' alt="Couverture" src="https://github.com/mdo.png" />
                <div className='row' style={{display: 'inline-block'}}>
                    <div className='col'></div>
                    <div className='col player-titre'>Titre Myen<i className="btn text-white fa fa-heart-o" onClick={() => {console.log('like')}} style={{cursor: 'default'}}></i></div>
                    <div className='col player-artiste'>Artiste</div>
                </div>
            </div>
            
            <div className='col-md-6'>
                <div className='row justify-content-md-center player-song-icons'>
                    <div className='col-sm-1 player-usable-icon'><i className="step backward icon"></i></div>
                    <div className='col-sm-1 player-play-icon player-usable-icon'><i className="play circle outline icon"></i></div>
                    <div className='col-sm-1 player-usable-icon'><i className="step forward icon"></i></div>
                </div>
                
                <div className='row'>
                    <div className='player-time col-sm-1' style={{textAlign: 'right'}}>3:58</div>
                    
                    <div className="col progress">
                        <input type="range" className="player-range" min="0" max="100"/>
                    </div>
                    <div className='player-time col-sm-1'>4:16</div>
                </div>
            </div>

            <div className='col-md-3'>
                <div className='row justify-content-md-center player-sound'>
                    <div className='col-sm-1 player-usable-icon'>
                        <i id='soundIcon' className="volume up icon" onClick={() => {muteSound(muteBool)}}></i>
                    </div>
                    <div className='col'>
                        <input id="soundRange"type="range" onInput={(e) => {setVolume(e.target.value)}} className="player-range" min="0" max="100"/>
                    </div>
                </div>
            </div>
        </div>
    );
}   