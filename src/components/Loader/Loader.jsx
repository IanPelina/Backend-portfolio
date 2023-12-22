import './Loader.scss';
import { useState, useEffect } from 'react';

export default function Loader() {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 4000);
        
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`loading ${isVisible ? '' : 'hidden'}`}>
            <div className="loading-text">
                <span className="loading-text-words">L</span>
                <span className="loading-text-words">O</span>
                <span className="loading-text-words">A</span>
                <span className="loading-text-words">D</span>
                <span className="loading-text-words">I</span>
                <span className="loading-text-words">N</span>
                <span className="loading-text-words">G</span>
            </div>
        </div>
    )
}