import  { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { valueconv } from '../../data'
import moment from 'moment'

const Feed = ({category}) => {

     const[data,setdata]=useState([])

  const fetchdata= async()=>{
     const videolisturl=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=99&regionCode=US&videoCategoryId=${category}&key=${API_KEY} `
     // await fetch(videolisturl).then(response=>response.json()).then(data=>setdata(data.items)) 
     const result=await fetch(videolisturl)
     const resp= await result.json()
     setdata(resp.items);
  }

  useEffect(()=>{
  fetchdata()
  },[category])
  

  return (<>
   <div className="feed">
   {data.map((item,index)=>{
    return(
     <Link key={index}  to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
         <img src={item.snippet.thumbnails.medium.url} alt="" />
         <h2>{item.snippet.title}</h2>
         <h3>{item.snippet.channelTitle}</h3>
         <p>{valueconv(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
    </Link>
    )
   })}  
   </div>
  </>)
}

export default Feed;
