import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, valueconv } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'


const Playvideo = () => {

    const {videoId}=useParams()

    const[apiData,setApiData]=useState(null)
    const[channeldata,setchanneldata]=useState(null)
    const[comments,setcomments]=useState([])

//fetching video data**************************************************************

    const fetchVideoData= async()=>{
         const videoDetails_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `
         const resp= await fetch(videoDetails_url)
         const data=await resp.json()
         setApiData(data.items[0])
    }

//fetching channel data********************************************************************

    const fetchChanneldata= async()=>{
        const id=apiData.snippet.channelId;
        const channel_api=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}  `
       // await fetch(channel_api).then((res)=>res.json).then((data)=>setchanneldata(data.items[0]))
        await fetch(channel_api).then(res=>res.json()).then(data=>setchanneldata(data.items[0]))

         //fetch comment data**************************************************************************
         const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=1000&videoId=${videoId}&key=${API_KEY} `
          await fetch(comment_url).then(res=>res.json()).then(res=>setcomments(res.items))
        }

   

    useEffect(()=>{
        fetchVideoData()
    },[videoId])

    useEffect(()=>{
        fetchChanneldata()
    },[apiData])
 
  return (<>
  <div className="play-video">
  <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    <h3>{apiData?apiData.snippet.title:"title here"}</h3>
    <div className="play-video-info">
        <p>{apiData?valueconv(apiData.statistics.viewCount):"100k"} &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
            <span><img src={like} alt="" />{apiData?valueconv(apiData.statistics.likeCount):"333k"}</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />share</span>
            <span><img src={save} alt="" />save</span>
        </div>
    </div>
    <hr />
    <div className="publisher">
        <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
        <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{channeldata?valueconv(channeldata.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
    </div>
    <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0,200):"description here"}</p>
       
        <hr />
        <h4>{apiData?valueconv(apiData.statistics.commentCount):102} Comments</h4>

        {comments.map((data,index)=>{
           return(
            <div key={index} className="comment">
            <img src={data.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div><h3>{data.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(data.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
            <p>{data.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="comment-action">
                <img src={like} alt="" />
                <span>{valueconv(data.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
            </div>
            </div>
        </div>
           )
        })}
        
       
    </div>
  </div>
  </>)
}

export default Playvideo
