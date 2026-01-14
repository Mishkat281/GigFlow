import React from 'react'
import Featured from '../../components/featured/Featured.jsx'
import "./Home.scss"
import TrustedBy from '../../components/trustedBy/TrustedBy.jsx'
import Slide from '../../components/slide/Slide.jsx'
import {cards, projects} from "../../data.js"
import CatCard from '../../components/catCard/catCard.jsx'
import ProjectCard from '../../components/projectcard/ProjectCard.jsx'

const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
      {cards.map(card=>(
        <CatCard key={card.id} item={card}/>
      ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find High-qaulity services at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find High-qaulity services at every price point. No hourly rates, just project-based pricing.</p><div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find High-qaulity services at every price point. No hourly rates, just project-based pricing.</p><div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find High-qaulity services at every price point. No hourly rates, just project-based pricing.</p>
          </div>
          <div className="item">
            <video src="./video/video.mp4" controls></video>
          </div>
        </div>
      </div>
       <Slide slidesToShow={4} arrowsScroll={4}>
      {projects.map(projects=>(
        <ProjectCard key={projects.id} item={projects}/>
      ))}
      </Slide>
    </div>
  )
}

export default Home
