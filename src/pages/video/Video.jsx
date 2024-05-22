import React from 'react'
import Playvideo from '../../components/playvideo/Playvideo'
import './video.css'
import Recommended from '../../components/recommended/Recommended'
import { useParams } from 'react-router-dom'

const video = () => {

  const{videoId,categoryId}=useParams()

  return (<>
    <div className="play-container">
      <Playvideo videoId={videoId} categoryId={categoryId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  </>)
}

export default video
