import { useState } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

import backgrounds from '../../data/backgrounds.json';

export default function Nav({children}) {

    const [visible, setVisible] = useState(false);
    const displayMenu = () => {
        setVisible(!visible)
    }

    const path = backgrounds[1].path;

    return (
        <nav className='nav'>
            <div className='logo'>
                <Link to='https://github.com/IanPelina/'>
                    <div className='logo-pic' style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}></div>
                </Link>
            </div>
                {!visible &&
                    <div className='nav-menu' onClick={displayMenu}>
                        <div className="barr"></div>
                        <div className="barr"></div>
                        <div className="barr"></div>
                    </div>
                }
                {visible && 
                    <div className="displayedMenu">
                        <div className='cross-container'>
                            <div className="cross-button" onClick={displayMenu}>
                                <div className='barr1'></div>
                                <div className='barr2'></div>
                            </div>
                        </div>
                        <ul className='displayedLinks'>
                            <li><a className='link' href='/cv-dev.pdf' target='_blank'>CV</a></li>
                            <li><a className='link' href='/#mes-projets'>Projets</a></li>
                            <li><a className='link' href="/#contact">Contact</a></li>
                        </ul>
                    </div>
                }
                {children}
        </nav>
    );
}
