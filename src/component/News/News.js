import React from 'react';
import { List, PullToRefresh, Button } from 'antd-mobile';
import axios from 'axios';

const Item = List.Item;
const Brief = Item.Brief;

class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            news: [],
            refreshing: false,
            data: [],
            step: 0
        }
    }
    componentDidMount() {
        const { step } = this.state
        axios.post('/user/news',{step}).then(res=>{
            if (res.status===200 && res.data.code===0){
                this.setState({
                    news: res.data.data
                })
                console.log(this.state.news)
            }
        })
    }

    render() {
        return (
            <PullToRefresh
                damping={60}
                direction='up'
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    const step = this.state.step+1;
                    axios.post('/user/news',{step}).then(res=>{
                        if (res.status===200 && res.data.code===0){
                            this.setState({
                                news: [...res.data.data],
                                refreshing: false,
                                step: step
                            })
                            console.log(this.state.news)
                        }
                    })
                }}
            >
                <List renderHeader={() => '最近新闻展示'} className="my-list">
                    {this.state.news.map(v=>(
                        <Item key={v.id} arrow="horizontal" multipleLine onClick={()=>{
                            this.props.history.push('/detail/'+v.id)
                        }}>
                            {v.title} <Brief>{v.con}</Brief>
                        </Item>
                    ))}
                </List>
            </PullToRefresh>
        );
    }
}

export default News;