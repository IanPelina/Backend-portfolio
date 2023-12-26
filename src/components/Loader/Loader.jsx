import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpRightAndDownLeftFromCenter,faTrash, faRotate} from '@fortawesome/free-solid-svg-icons';

import './Loader.scss';
import { useState, useEffect, useRef } from 'react';

export default function Loader() {

    const [isVisible, setIsVisible] = useState(true);
    const [displayed, setDisplayed] = useState(true);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [noReload, setNoReload] = useState(false);
    const [reloadOneMore, setReloadOneMore] = useState(false);

    let textTimeout;

    const timeoutRef = useRef(null);

    useEffect(() => {

        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)
        
        return () => clearTimeout(textTimeout);
    }, []);

    
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
        }, 6500);
        
        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(textTimeout);
        };
    }, []);

    const killServer = () => {
        setHidden(true);
        setIsLoaded(false);
        clearTimeout(timeoutRef.current);
        clearTimeout(textTimeout);
    }

    const hideServer = () => {
        if (isMaximized) {
            clearTimeout(timeoutRef.current);
            killServer();
            setDisplayed(false);
        } else {
            killServer();
            setDisplayed(false);
        }
    }

    const reloadServer = () => {
        setDisplayed(true);
        setHidden(false);
        setIsLoaded(false);
        clearTimeout(textTimeout);
        clearTimeout(timeoutRef.current);
        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        },6500)
    }

    const reloadAgain = () => {
        clearTimeout(textTimeout)
        clearTimeout(timeoutRef.current)
        setReloadOneMore(true);
        reloadServer();
        textTimeout = setTimeout(() => 5500)
        setNoReload(false);
        setReloadOneMore(false);
    }

    const skipAnimation = () => {
        setIsVisible(false);
        setIsLoaded(true);
    }

    return (
        <>
            <div className={`container ${!isVisible && 'invisible'}`}>
                    {displayed && 
                        <div className={`terminal-loader ${isMaximized && 'maximized'}`}>
                            <div className="terminal-header">
                                <div className={`terminal-title ${hidden && 'error-title'}`}>
                                    {isLoaded && !hidden && 'Bienvenue ✅'}
                                    {!isLoaded && !hidden && 'Veuillez patienter ...'}
                                    {hidden && 'Veuillez rafraichir la page ou fermer le terminal .'}
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
                            {hidden && <div className="error-text">app crashed - waiting for file changes before starting ...</div>}
                            {!hidden && 
                                <>
                                    <div className="text">npm start</div>
                                    <div className="text text2">{`> portfolio@1.0.0 start `}</div>
                                    <div className="text text3">{`> react-scripts start `}</div>
                                    <div className="text4">Starting the development server ...</div>
                                </>
                            }
                        </div>
                    }
                    {!displayed && 
                        <div className={`reborn ${noReload && 'noReloaded' || ''}`}>Relancer le serveur ?
                            <div className="responses">
                                <div className='response' id='true' onClick={() => reloadServer()}>Oui</div>
                                <div className='response' id='false' onClick={() => setNoReload(true)}>Non</div>
                            </div>
                        </div>
                    }
                    {noReload && 
                        <div className={`${reloadOneMore && 'hideAgain' || 'reloadAgain-container'}`}>
                            <FontAwesomeIcon className='reload-icon' icon={faRotate} onClick={() => reloadAgain()} />
                            <div className='byebye'>Bye Bye 👋 😒</div>
                        </div>
                    }
                <div className='skip' onClick={() => skipAnimation()}>Passer l'animation</div>
            </div>
        </>
        )
    }