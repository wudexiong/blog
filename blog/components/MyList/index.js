// 文章列表
import React from 'react'
import MyListItem from './MyListItme'
import { List } from 'antd'


export default function MyList(props) {
    return (
    <List 
        itemLayout="vertival"
        dataSource={props.data}
        renderItem={(item, index) => {
            return(
                
                <List.Item key={item+index}>
                    <MyListItem 
                    item={item}
                    index={index}
                    />
                </List.Item>
                )
            
        }}
        / >
        )
}

