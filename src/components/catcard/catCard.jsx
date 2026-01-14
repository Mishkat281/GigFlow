import React from 'react'
import "./catCard.scss"
import {Link} from "react-router-dom"

const CatCard = ({item}) => {
  return (
    <div className="catCard">
      <Link to="/gigs?cat=design" className="link">
        <img src={item.img} alt="" />
        <p className="desc">{item.desc}</p>
        <span className="title">{item.title}</span>
      </Link>
    </div>
  )
}

export default CatCard
