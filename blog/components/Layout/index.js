// 整个页面框架布局
import React from 'react'
import Head from 'next/head'
import Header from './Header/'
import MyMain from './MyMain/'
import Footer from './Footer/'

const Layout = (props) => (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <MyMain
        left={
            props.left
        }
        right={
            props.right  
        }
      />
      <Footer />
   </>
)

export default Layout