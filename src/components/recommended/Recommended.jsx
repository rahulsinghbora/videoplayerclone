import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, valueconv } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const[api_data,setapi_data]=useState([])

    const fetchdata=async()=>{
        const related_video=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY} `
       await fetch(related_video).then((res)=>res.json()).then((res)=>setapi_data(res.items))
    }

    useEffect(()=>{
        fetchdata()
    },[])

  return (<>
    <div className="recommended">
       {api_data.map((item,index)=>{
          return(
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{valueconv(item.statistics.viewCount)}</p>
            </div>
        </Link>
          )
       })}
    
    </div>
  </>)
}

export default Recommended
