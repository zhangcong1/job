import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';  //用于非路由组件使用this.props.history

@withRouter
class UserList extends React.Component{
    static PropTypes = {
        userList:PropTypes.array.isRequired
    }
    handelClick(v){
        this.props.history.push(`/chat/${v.name}`)
    }
    render(){
        return(
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    {this.props.userList.map(v=>(
                        v.head?(
                            <div key={v._id}>
                                <WhiteSpace/>
                                <Card onClick={()=>this.handelClick(v)}>
                                    <Card.Header
                                        title={v.name}
                                        thumb={v.head}
                                        extra={v.title}
                                    />
                                    <Card.Body>
                                        {v.type=='boss'?<div>公司名称：{v.company}</div>:null}
                                        {v.desc.split('\n').map(k=>(
                                            <div key={k}>{k}</div>
                                        ))}
                                        {v.type=='boss'?<div>薪资：{v.money}</div>:null}
                                    </Card.Body>

                                </Card>
                            </div>
                        ):null
                    ))}
                </WingBlank>
            </div>
        )
    }
}
export default UserList;