import React from 'react';
import { List } from 'antd-mobile';
import axios from 'axios';

const Item = List.Item;
const Brief = Item.Brief;

class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            news: []
        }
    }
    componentDidMount() {
        axios.get('/user/news').then(res=>{
            if (res.status===200 && res.data.code===0){
                this.setState({
                    news: res.data.data
                })
                console.log(this.state.news)
            }
        })
        console.log(this.props)
    }

    render() {
        return (
            <List renderHeader={() => '最近新闻展示'} className="my-list">
                {this.state.news.map(v=>(
                    <Item key={v.id} arrow="horizontal" multipleLine onClick={()=>{
                        this.props.history.push('/detail/'+v.id)
                    }}>
                        {v.title} <Brief>{v.con}</Brief>
                    </Item>
                ))}
            </List>
        );
    }
}

export default News;