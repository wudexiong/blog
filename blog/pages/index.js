import React, { useState } from 'react'
import Layout from '../components/Layout'
import MyList from '../components/MyList/'
import Author from '../components/Author/'
import Advert from '../components/Advert/'

import { getArticleList } from '../api/'

const Home = (list) => {
  
  const [mylist, setMylist] = useState(list.data)
  return (
    <>
    <Layout
        title="web技术学习"
        left={
            <MyList 
              data={mylist}
            />
          }
        right={
            <>
            <Author />
            <Advert />
            </>
        }
     />
    </>
  )
}
Home.getInitialProps = async ()=>{
  return await getArticleList()
}

export default Home
