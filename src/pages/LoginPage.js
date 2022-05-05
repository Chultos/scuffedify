/**
 * Fonction qui affiche la page de connexion
 * 
 * @param  {} {credentials}
 */
export const LoginPage = ({credentials}) => {

    //Préparation de l'url d'authentification
    let endpoint = 'https://accounts.spotify.com/authorize';
    let redirect_uri = 'https://scuffedify.vercel.app/'
    let scopes = [
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'playlist-modify-public'
    ]

    let authUrl = endpoint + '?client_id=' + credentials.id + '&redirect_uri=' + redirect_uri + '&scope=' + scopes.join('%20') + '&response_type=token&show_dialog=true';

    //Affichage de la page
    return (
        <main className='unselectable' style={{height: window.screen.height}}>
            <div className='login-page text-white bg-dark bg-gradient'>
                <div className="fs-4 text-white login-logo"><i className="fa fa-music" aria-hidden="true" style={{color: '#1cb854'}}/>&nbsp;&nbsp;Scuffedify</div>
                <hr/>

                <div className='row justify-content-md-center'>
                    <div className='col-md-3 login-form'>
                        <div className='divBtn'>
                            <a href={authUrl} className="green-button-big btn btn-success">Se connecter avec Spotify</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}