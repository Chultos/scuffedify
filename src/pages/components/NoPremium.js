/**
 * Fonction qui affiche la page NoPremium
 * @param  {} {resetAllVariables}
 */
export const NoPremium = ({resetAllVariables}) => {
    return (
        <main className='unselectable' style={{height: window.screen.height}}>
            <div className="no-premium-page text-white bg-dark bg-gradient">
                <div className="fs-4 text-white login-logo"><i className="fa fa-music" aria-hidden="true" style={{color: '#1cb854'}}/>&nbsp;&nbsp;Scuffedify</div>
                <hr></hr>
                <div className='message-ctnr'>
                    <h1>Un compte spotify premium est requis pour utiliser cette application</h1>
                    <a className='green-button-big btn btn-success' onClick={() => {resetAllVariables()}}>Changer de compte</a>
                </div>
            </div>
        </main>
    );
}