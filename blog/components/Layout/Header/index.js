// 网站头部导航

import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { getTypeInfo } from '../../../api'
import { Row, Col, Menu } from 'antd'
import  * as Icon from '@ant-design/icons';




const Header = () => {
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
           const result = await getTypeInfo()
           setNavArray(result.data.data)
        }
        fetchData()
    },[])
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }


    }
    return (
    <header className="header">
      <Row type="flex" justify="center">
          <Col   xs={24} sm={24} md={10} lg={15} xl={12}>
              <span className="header-logo">wwwjs</span>
              <h1 className="header-txt">专注前端开发,学习分享笔记</h1>
          </Col>
          
          <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
              <nav>
              <Menu  mode="horizontal"
                    onClick={handleClick}
              >
                  
                  <Menu.Item key="0">
                    <Icon.HomeOutlined />
                      首页
                  </Menu.Item>
                  {
                    navArray.map((item)=>{
                        return(
                            <Menu.Item key={item.Id}>
                                {
                                    React.createElement(
                                        Icon[item.icon] 
                                    )
                                }
                                {item.typeName}
                            </Menu.Item>
                        )
                    }) 
                    }
              </Menu>
              </nav>
          </Col>
          
      </Row>
   </header>
  )}

  export default Header