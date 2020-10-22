import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import api from '../api/index'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import '../static/css/Login.css'
  
function Login(props){
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{

    },[])
    const checkLogin = ()=>{
        setIsLoading(true)

        if(!userName){
            message.error('用户名不能为空')
            setIsLoading(false)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setIsLoading(false)
            return false
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        api({
            method:'post',
            url:"checkLogin", 
            data: dataProps,
            widthCredentials: true
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.data==='登录成功'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }else{
                    message.error('用户名密码错误')
                }
           }
        )
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="wwwjs Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined twoToneColor="rgba(0,0,0,.25)"/> }
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<UnlockOutlined twoToneColor="rgba(0,0,0,.25)"/> }
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login