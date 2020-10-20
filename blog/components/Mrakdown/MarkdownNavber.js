import React from 'react'
import { Affix } from 'antd'
import { tocify } from './marked'

const MarkdomnNavber = () => (
    <>
     <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
            <div className="nav-title">文章目录</div>
            <div className="toc-list">
            {tocify && tocify.render()}
            </div>
            </div>
            </Affix>
    
    </>
)
export default MarkdomnNavber