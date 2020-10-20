// 文章详情页
import React from 'react'
import { Breadcrumb } from 'antd'
import { HistoryOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons'

import Layout from '../components/Layout/'
import Mrakdomn from '../components/Mrakdown'
import Author from '../components/Author'
import Advert from '../components/Advert'
import MrakdownNvaber from '../components/Mrakdown/MarkdownNavber'
import { getArticleById } from '../api/'
import '../static/style/pages/detailed.css'

const Detailed = (data) => (
    <>
    <Layout
        title="React Hooks+Egg.js实战视频教程-技术胖Blog开发"
        left={
            <>
            <header className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>
                <a href={'/list?id='+data.typeId}>{data.typeName}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
              </Breadcrumb>
            </header>

           <div>
              <h2 className="detailed-title">
                {data.title}
              </h2>

              <section className="list-icon center">
                <span><HistoryOutlined /> {data.addTime}</span>
                <span><TagsOutlined /> {data.typeName}</span>
                <span><EyeOutlined /> {data.view_count}人</span>
              </section>
              <Mrakdomn 
              data={data.article_content}
              />
              

           </div>

          </>
          }
        right={
            <>
            <Author />
            <Advert />
            <MrakdownNvaber 
            />
            </>
        }
     />
   </>
  )

Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  return await getArticleById(id)
}

  export default Detailed