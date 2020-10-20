import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import MyList from '../components/MyList/'
import Author from '../components/Author/'
import Advert from '../components/Advert/'

import { getListById } from '../api/'

 const List = (props) => {
  const [mylist, setMylist] = useState(props.data)
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
List.getInitialProps = async (context)=>{
    let id =context.query.id
  return await getListById(id)
}

export default List