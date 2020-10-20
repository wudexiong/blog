import React from 'react'
import { marked } from './marked'
import './mrakdown.css'


const Mrakdown = (props) => {
  return(
    <>
    <div className="detailed-content" 
              dangerouslySetInnerHTML = {{__html: marked(props.data)}}
              >
    </div>
    </>
  )
}

export default Mrakdown