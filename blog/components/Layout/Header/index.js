// 网站头部导航

import React from 'react'
import './herader.css'

import { Row, Col, Menu } from 'antd'
import { HomeOutlined, ProfileOutlined, SmileOutlined    } from '@ant-design/icons';

const Header = () => (
    <header className="header">
      <Row type="flex" justify="center">
          <Col   xs={24} sm={24} md={10} lg={15} xl={12}>
              <span className="header-logo">wwwjs</span>
              <h1 className="header-txt">专注前端开发,学习分享笔记</h1>
          </Col>
          
          <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
              <nav>
              <Menu  mode="horizontal">
                  
                  <Menu.Item key="home">
                    <HomeOutlined />
                      首页
                  </Menu.Item>
                  <Menu.Item key="video">
                  <ProfileOutlined />
                      笔记
                  </Menu.Item>
                  <Menu.Item key="life">
                  <SmileOutlined />
                      生活
                  </Menu.Item>
              </Menu>
              </nav>
          </Col>
          
      </Row>
   </header>
  )

  export default Header