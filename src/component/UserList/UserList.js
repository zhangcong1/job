import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';  //用于非路由组件使用this.props.history

@withRouter
class UserList extends React.Component{
    /*static PropTypes = {
        userList:PropTypes.array.isRequired
    }*/
    constructor(props){
        super(props);
    }
    handelClick(v){
        this.props.history.push(`/chat/${v.uid}`)
    }
    render(){
        let { userList } = this.props;
        return(
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    {userList.map(v=>(
                        v.heads?(
                            <div key={v.uid}>
                                <WhiteSpace/>
                                <Card onClick={()=>this.handelClick(v)}>
                                    <Card.Header
                                        title={v.account}
                                        thumb={v.heads}
                                        extra={v.titles}
                                    />
                                    <Card.Body>
                                        {v.types==='boss'?<div>公司名称：{v.company}</div>:null}
                                        {v.descs!==null?v.descs.split('\n').map(k=>(
                                            <div key={k}>{k}</div>
                                        )):null}
                                        {v.types==='boss'?<div>薪资：{v.money}</div>:null}
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