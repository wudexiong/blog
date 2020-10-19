// 文章列表中的每个文章
import React from 'react'
import './myListItem.css'
import { HistoryOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons'
const MyListItem = (props) => {
    return (
        <article className="my-list">
        <header>
        <h3 className="list-title">{props.item.title}</h3>
        </header>
        <section className="list-icon">
            <span><HistoryOutlined /> 2019-06-28</span>
            <span><TagsOutlined /> js教程</span>
            <span><EyeOutlined /> 5498人</span>
        </section>
        <section><p className="list-context">{props.item.context}</p></section>
        <footer>
        <p><small>作者</small></p>
        </footer>
        </article>
    )
}

export default MyListItem