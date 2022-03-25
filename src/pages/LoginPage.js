import React from 'react';

export const LoginPage = ({setLogin}) => {

    return (
        <main className='unselectable' style={{height: window.screen.height}}>
            <div className='login-page text-white bg-dark bg-gradient'>
                <div className="fs-4 text-white login-logo"><i className="fa fa-music" aria-hidden="true" style={{color: '#1cb854'}}/>&nbsp;&nbsp;Scuffedify</div>
                <hr/>

                <div className='row justify-content-md-center'>
                    <div className='col-md-3 login-form'>
                        <div className='divBtn'>
                            <button type="button" className="green-button-big btn btn-success" onClick={() => {setLogin(true)}}>Se connecter avec Spotify</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}