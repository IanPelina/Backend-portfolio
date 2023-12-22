import './Projects.scss';

import ProjectsCard from '../ProjectsCard/ProjectsCard';

import React, { useEffect, useState } from 'react';

import api from '../../axios';

export default function Projects() {

  const [works, setWorks] = useState([]);

  useEffect(() => {
    api.get('/works', { withCredentials: true })
      .then(response => {
        setWorks(response.data.works);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <>
      <h1>Mes projets</h1>
      <div className="projects-cards">
        {works.map(work =>
          <ProjectsCard key={work.id} work={work} skills={work.skills} />
        )}
      </div>
    </>
  );
}