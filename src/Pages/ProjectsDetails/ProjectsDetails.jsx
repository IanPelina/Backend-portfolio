import './ProjectsDetails.scss';

import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import Collapse from '../../components/Collapse/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import api from '../../axios';
import Cover from '../../components/Cover/Cover';
import Nav from '../../components/Nav/Nav';

export default function ProjectsDetails() {

  const path = '/images/cv-back.jpg'

  const navigate = useNavigate();
  const { id } = useParams();


  const [detailsWork, setDetailsWork] = useState(null);
  useEffect(() => {
    api.get("/works/" + id).then(({ data }) => {
      setDetailsWork(data.work);
      if (!data) { navigate("/404"); }
    }).catch(() => { navigate("/404"); });
  }, [id]);

  return detailsWork && (
  
    <div className="background" style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div>
        <header>
          <div className="center-container">
            <div className='nav-container'>
              <Nav>
                <ul className='links'>
                  <li><a className='link' href="/">Accueil</a></li>
                </ul>
              </Nav>
            </div>
          </div>
        </header>
        <main className='work-container'>
          <div className="work-details" id='cover-container'>
            <Cover detailsWork={detailsWork} />
          </div>
          <div className='work-details' id='second-container'>
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