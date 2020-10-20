// 文章列表中的每个文章
import React from 'react'
import Link from 'next/link'
import { HistoryOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons'
import Mrakdown from '../Mrakdown/'
import './myListItem.css'

const MyListItem = ({ item }) => {
    return (
        <article className="my-list">
        <header>
        <h3 className="list-title">
            <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                <a>{item.title}</a>
            </Link>
            </h3>
        </header>
        <section className="list-icon">
            <span><HistoryOutlined /> {item.addTime}</span>
            <span><TagsOutlined /> {item.typeName}</span>
            <span><EyeOutlined /> {item.view_count}人</span>
        </section>
        <section>
        <div className="list-context">
        <Mrakdown 
            data={item.introduce}
        />
        </div>
        </section>
        <footer>
        <p><small>作者</small></p>
        </footer>
        </article>
    )
}

export default MyListItem