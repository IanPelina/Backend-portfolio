import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSquare} from '@fortawesome/free-solid-svg-icons';

import './Loader.scss';
import { useState, useEffect } from 'react';

export default function Loader() {

    const [isVisible, setIsVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {

        const firstTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)

        const timeout = setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
        },6000)
        
        return () => clearTimeout(timeout, firstTimeout);
    }, []);

    return (
        <div className={`container ${isVisible ? '' : 'hidden'}`}>
            <div className={`terminal-loader ${isMaximized ? 'maximized' : '' }`}>
                <div className="terminal-header">
                    <div className="terminal-title">{isLoaded && 'Bienvenue 👋 !' || 'Veuillez patienter ...'}</div>
                    <div className="terminal-controls">
                        <div className="control maximize">
                            <FontAwesomeIcon className='close' icon={faSquare} onClick={() => setIsMaximized(!isMaximized)}/>
                        </div>
                        <div className="control">
                            <FontAwesomeIcon className='close' icon={faXmark} onClick={() => setHidden(!hidden)}/>
                        </div>
                    </div>
                </div>
                {hidden && <div className="error-text">Oups ... veuillez rafraichir la page</div>}
                {!hidden && 
                    <>
                        <div className="text">npm start</div>
                        <div className="text2">{`> portfolio@1.0.0 start `}</div>
                        <div className="text3">{`> react-scripts start `}</div>
                        <div className="text4">Starting the development server ...</div>
                    </>
                }
            </div>
        </div>
        )
    }