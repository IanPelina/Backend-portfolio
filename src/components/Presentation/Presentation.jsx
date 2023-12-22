import './Presentation.scss';

import backgrounds from '../../data/backgrounds.json';

import Typewriter from 'typewriter-effect';

export default function Presentation() {
    
    const path = backgrounds[1].path;

    return (
        <section className="presentation">
            <div className='presentation-content'>
                    <div className="title-and-text">
                        <Typewriter
                            options={{
                                strings: ['Bonjour \! Je m\'appelle'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                        <h1>Ian Le Pape</h1>
                        <p className='terminal-text'>
                            Je suis développeur Front-end débutant, passioné de programmation et de jeux vidéos.
                            <br></br>
                            J'aime découvir de nouvelles technologies et relever toujours plus de défis.
                        </p>
                    </div>
                <div className="profil-pic" style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',  }}></div>
            </div>  
        </section>
    )
}