import React from 'react'
import "./Gig.scss";
import Slider from "infinite-react-carousel";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const Gig = () => {

  const { id } = useParams();
  
  const { isLoading, error, data  } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs/single/${id}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser  ,
  } = useQuery({
    queryKey: [`${data?.userId}`],
    queryFn: () =>
      newRequest
        .get(
          `/users/${userId}`
        )
        .then((res) => {
          return res.data;
        }),
        enabled: !!userId,
  });


  return (
    <div className='gig'>
      {isLoading?"loading" : error ? "Something went wrong" : <div className="container">
        <div className="left">
          <span className="breadCrumbs">
            GigFlow {">"} Graphics & Design </span>
            <h1>{data.title}</h1>

           {isLoadingUser ? "loading" : errorUser ? "Something went wrong" :
            <div className="user">
              <img className='pp' src={dataUser?.img || "/img/nonavatar.jpg"} alt="" />
              <span>{dataUser.username}</span>

                {!NaN(data.totalStars/data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item, i)=>(
                      <img key={i} src="/img/star.png" alt="" />
                    ))}
                <span>
                    {Math.round(data.totalStars/data.starNumber)}</span>                
              </div>
                )}
            </div>}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
             {data.images.map((img)=>(
              <img key={img} src={img} alt="" />
             ))}            
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={dataUser?.img || "/img/nonavatar.jpg"} alt="" />
                <div className="info">
                  <span>{dataUser.name}</span>
                   {!NaN(data.totalStars/data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item, i)=>(
                      <img key={i} src="/img/star.png" alt="" />
                    ))}
                 <span>
                    {Math.round(data.totalStars/data.starNumber)}</span>                
              </div>
                )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member Since</span>
                    <span className="desc">May 2023</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">5 hrs</span>
                  </div>
                  <div className="item">
                    <span className="title">Last Delivery </span>
                    <span className="desc">3 Day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>               
                </div>
                <p>
                  {dataUser?.desc}
                </p>
              </div>
            </div>
            <Reviews gigId={id} />
            
          </div>
        <div className="right">
              <div className="price">
                <h3>{data.shortTitle}</h3>
                <h2>{data.price}</h2>
                
              </div>
              <p>
                {data.shortDesc} 
              </p>
              <div className="details">
                  <div className="item">
                    <img src="/img/clock.png" alt="" />
                    <span>{data.deliveryTime} Delivery</span>
                  </div>
                  <div className="item">
                    <img src="/img/recycle.png" alt="" />
                    <span>{data.revisions} Revisions</span>
                  </div>
              </div>
              <div className="features">
                {data.features.map((features) => (
                <div className="item" key={features}>
                  <img src="/img/green check.jpg" alt="" />
                  <span>{features} </span>
                </div>
                ))}
                
              </div>
              <button>Continue</button>
        </div>
      </div>}
      
    </div>
  )
}

export default Gig
