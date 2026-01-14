import React from 'react'
import "./GigCard.scss"
import { Link } from "react-router-dom";


const GigCard = ({item}) => {

      const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest
        .get(
          `/users/${item.userId}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  return (
    
        <Link to={`gig/${item.id}`} className='link'>
        <div className="gigCard">
            <img src={item.cover} alt="" />
            <div className="info">
                {
                    isLoading ? "loading" : error ? "Something went wrong!" : data && (

                
                <div className="user">
                    <img src={data.img || "/img/nonavatar.jpg"} alt="" />
                    <span>{data.username}</span>
                </div>)}
                <p>{item.desc}</p>
                <div className="star">
                <img src="./img/star.png" alt="" />
                <span>{!NaN(item.totalStars/item.starNumber) && 
                    Math.round(item.totalStars/item.starNumber)}</span>
            </div>
        </div>
        <hr />
        <div className="details">
            <img src="./img/heart.webp" alt="" />
            <div className="price">
             <span>STARTING AT</span>
            <h2>${item.price}</h2>
        </div>  
        </div>
        </div>    
     </Link>
  )
}

export default GigCard
