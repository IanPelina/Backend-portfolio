import Footer from '../../components/Footer/Footer';
import Form from '../../components/Form/Form';
import Nav from '../../components/Nav/Nav';
import Presentation from '../../components/Presentation/Presentation';
import Projects from '../../components/Projects/Projects';
import './Home.scss';

import { useState } from 'react';

export default function Home() {
    
    const path = '/images/pres-back.jpeg'; 
    
    const [visible, setVisible] = useState(false);
    const displayMenu = () => {
        setVisible(!visible)
    }

    return (
        <div className="home-container" style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <Nav>
                <ul className='links'>
                    <li><a className='link' href='/cv-dev.pdf' target='_blank'>CV</a></li>
                    <li><a className='link' href='#mes-projets'>Projets</a></li>
                    <li><a className='link' href="#contact">Contact</a></li>
                </ul>
                {!visible &&
                    <div className='nav-menu' onClick={displayMenu}>
                        <div className="barr"></div>
                        <div className="barr"></div>
                        <div className="barr"></div>
                    </div>
                }
                {visible && 
                    <>
                    <div className='cross' onClick={displayMenu}>
                        <div className='cross-container'>
                            <div className="cross-button" onClick={displayMenu}>
                                <div className='barr1'></div>
                                <div className='barr2'></div>
                            </div>
                        </div>
                    </div>
                    <div className="displayedMenu">
                        <ul className='displayedLinks'>
                            <li><a className='link' href='/cv-dev.pdf' target='_blank'>CV</a></li>
                            <li><a className='link' href='/#mes-projets'>Projets</a></li>
                            <li><a className='link' href="/#contact">Contact</a></li>
                        </ul>
                    </div>
                    </>
                }
            </Nav>
            <main >
                <Presentation />
                <section className="projects" id='mes-projets'>
                    <Projects />
                    <Form />
                </section>
            </main>
            <Footer />
        </div>
    )
}