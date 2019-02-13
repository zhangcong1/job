import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types';

class UserList extends React.Component{
    static PropTypes = {
        userList:PropTypes.array.isRequired
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
                                <Card>
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