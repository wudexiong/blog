// 两栏布局框架
import React from 'react'
import {Row, Col} from 'antd'
const MyMain = (props) => {
    return (
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
      <article>
        {props.left}
      </article>
      </Col>
     
      
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
      <aside>
      {props.right}
      </aside>
      </Col>
    </Row>
    
    )
}

export default MyMain