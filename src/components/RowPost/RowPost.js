import React, { useEffect, useState } from 'react'
import "./RowPost.css"
import Youtube from 'react-youtube'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios'

function RowPost(props) {
  const [movies,setMovies] = useState([]);
  const [urlId,setUrlid] = useState('')
  useEffect(()=>{
    axios.get(props.url)
    .then(response => {
       if(response.data && response.data.results) {
           setMovies(response.data.results)
       } else {
           console.error("Invalid response format, expected an object with results array");
       }
    }).catch(err => {
       console.error("Error while fetching data", err);
    });
  },[]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US&include_video_language=en,pt,fr`).then((response)=>{
      if(response.data.results.length!==0){
        setUrlid(response.data.results[0])
      }else{
        console.log("Array is empty")
      }
    })
  }
  
  return (
    <div className='row'>
        <h2>
           {props.title}
        </h2>
        <div className="posters">
         {movies.map((obj, index) => (
              <img onClick={()=>handleMovie(obj.id)}  key={index} className={props.isSmall? "smallPoster":'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
          ))}
        </div>
        {urlId && <Youtube opts={opts} videoId={urlId.key} /> }
    </div>
  )
}

export default RowPost
