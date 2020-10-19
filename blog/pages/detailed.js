// 文章详情页
import React from 'react'
import Layout from '../components/Layout/'
import { Breadcrumb, Affix } from 'antd'
import { HistoryOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Mrakdomn from '../components/Mrakdown'
import MrakdomnNvaber from '../components/MarkdomnNavber'
import '../static/style/pages/detailed.css'


let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
const Detailed = () => (
    <>
    <Layout
        title="React Hooks+Egg.js实战视频教程-技术胖Blog开发"
        left={
            <>
            <header className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                <Breadcrumb.Item>React Hooks+Egg.js实战视频教程-技术胖Blog开发</Breadcrumb.Item>
              </Breadcrumb>
            </header>

           <div>
              <h2 className="detailed-title">
              React Hooks+Egg.js实战视频教程-技术胖Blog开发
              </h2>

              <section className="list-icon center">
                <span><HistoryOutlined /> 2019-06-28</span>
                <span><TagsOutlined /> js教程</span>
                <span><EyeOutlined /> 5498人</span>
              </section>

              <div className="detailed-content" >
                    <Mrakdomn
                        source={markdown}
                        escapeHtml={false}
                    />
              </div>

           </div>

          </>
          }
        right={
            <>
            <Author />
            <Advert />
            <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            <MrakdomnNvaber
                className="article-menu"
                source={markdown}
                ordered={false}
            />
            </div>
            </Affix>
            </>
        }
     />
   </>
  )
  
  export default Detailed