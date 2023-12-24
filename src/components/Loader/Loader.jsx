import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpRightAndDownLeftFromCenter,faTrash} from '@fortawesome/free-solid-svg-icons';

import './Loader.scss';
import { useState, useEffect } from 'react';

export default function Loader() {

    const [isVisible, setIsVisible] = useState(true);
    const [displayed, setDisplayed] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [noReload, setNoReload] = useState(false);

    let timeout;
    let textTimeout;

    useEffect(() => {

        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)

        timeout = setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
        },6500)
        
        return () => clearTimeout(timeout, textTimeout);
    }, []);

    const killServer = () => {
        setHidden(true);
        setIsLoaded(false);
        clearTimeout(textTimeout) 
        clearTimeout(timeout);
    }

    const hideServer = () => {
        killServer();
        setDisplayed(false);
    }

    const reloadServer = () => {
        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },500)

        timeout = setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
        },200)
    }

    return (
        <div className={`container ${isVisible ? '' : 'hidden'}`}>
            {displayed && 
                <div className={`terminal-loader ${isMaximized ? 'maximized' : '' }`}>
                <div className="terminal-header">
                    <div className='terminal-title'>
                        {isLoaded && !hidden && 'Bienvenue ✅'}
                        {!isLoaded && !hidden && 'Veuillez patienter ...'}
                        {hidden && '> Veuillez rafraichir la page ou fermer le terminal . '}
                    </div>
                    <div className="terminal-controls">
                        <div className="control maximize">
                            <FontAwesomeIcon className='close' icon={faUpRightAndDownLeftFromCenter} onClick={() => setIsMaximized(!isMaximized)}/>
                        </div>
                        <div className='control'>
                            <FontAwesomeIcon  className='close' icon={faTrash} onClick={() => killServer()}/>
                        </div>
                        <div className="control">
                            <FontAwesomeIcon className='close' icon={faXmark} onClick={() => hideServer()}/>
                        </div>
                    </div>
                </div>
                {hidden && <div className="error-text">app crashed - waiting for file changes before starting...</div>}
                {!hidden && 
                    <>
                        <div className="text">npm start</div>
                        <div className="text2">{`> portfolio@1.0.0 start `}</div>
                        <div className="text3">{`> react-scripts start `}</div>
                        <div className="text4">Starting the development server ...</div>
                    </>
                }
                </div>
                || 
                <div className={`reborn ${noReload && 'noReloaded'}`}>Relancer le serveur ?
                    <div className="responses">
                        <div className='response' onClick={() => reloadServer()}>Oui</div>
                        <div className='response false' onClick={() => setNoReload(true)}>Non</div>
                    </div>
                </div>
            }
            {noReload && <div className='byebye'>Bye Bye 👋 😒 </div>}
        </div>
        )
    }