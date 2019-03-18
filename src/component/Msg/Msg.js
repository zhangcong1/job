import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';

@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        console.log(this.props)
        const Item = List.Item;
        const Brief = Item.Brief;
        const users = this.props.chat.users;
        const userId = this.props.user.uid;
        //将消息进行分组
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        })
        const chatList =  Object.values(msgGroup).sort((a,b)=>{
            console.log(this.getLast(a))
            console.log(this.getLast(b))
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            console.log(b_last - a_last)
            return b_last - a_last
        })
        console.log(chatList)

        return(
            <List>
                {chatList.map(v=>{
                    //获取列表最后一条消息
                    const lastMsg = this.getLast(v);
                    //列表展示用户信息
                    const targetId = lastMsg.froms == userId ? lastMsg.tos : lastMsg.froms;
                    //未读消息数
                    const unread = v.filter(val=> !val.reads && val.tos == userId).length;
                    return (
                        <Item
                            key={lastMsg.cid}
                            thumb={users[targetId].head}
                            extra={<Badge text={unread} />}
                            onClick={()=>{
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        >
                            {lastMsg.content}
                            <Brief>{users[targetId].name}</Brief>
                        </Item>
                    )
                })}

            </List>
        )
    }
}
export default Msg;