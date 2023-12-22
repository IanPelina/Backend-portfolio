import './ProjectsDetails.scss';

import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import backgrounds from '../../data/backgrounds.json';

import Nav from '../../components/Nav/Nav';

import Footer from '../../components/Footer/Footer';
import Collapse from '../../components/Collapse/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import api from '../../axios';
import Cover from '../../components/Cover/Cover';

export default function ProjectsDetails() {

  const path = backgrounds[2].path;

  const navigate = useNavigate();
  const { id } = useParams();


  const [detailsWork, setDetailsWork] = useState(null);
  useEffect(() => {
    api.get("/works/" + id).then(({ data }) => {
      setDetailsWork(data.work);
      if (!data) { navigate("/404"); }
    }).catch(() => { navigate("/404"); });
  }, [id, navigate]);

  return detailsWork && (
  
    <div className="background" style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div>
        <header>
          <Nav>
            <ul className='links'>
              <li><a className='link' href="/">Accueil</a></li>
              <li><a className='link' href="/contact">Contact</a></li>
            </ul>
          </Nav>
        </header>
        <main className='work-container'>
          <div className="work-details">
            <Cover detailsWork={detailsWork} />
          </div>
          <div className='work-details'>
            <div className='work-detail practice'>
              <h2>Pratique</h2>
              <div className="practice-container">
                {detailsWork.practice.map(practiceContent => <Collapse key={practiceContent.title} content={practiceContent.content} title={practiceContent.title} />)}
              </div>
            </div>
            <div className='work-detail acquired'>
              <h2>Acquis</h2>
              <div className='acquired-container'>
                {detailsWork.acquired.map((acquiredText, index) => <p key={index}>{acquiredText}<FontAwesomeIcon icon={faCircleCheck} style={{marginLeft: 10, width: 14, height: 14}}/></p>)}
              </div>
            </div>  
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}