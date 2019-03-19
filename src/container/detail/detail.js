import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import axios from 'axios';

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news:{},
            titleStyle:{
                fontSize: '20px',
                lineHeight: '28px',
                margin: 0,
                fontWeight:500
            },
            conStyle:{
                lineHeight: '20px',
                color: '#555555'
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.post('/user/detail',{id}).then(res=>{
            if (res.status===200 && res.data.code===0){
                this.setState({
                    news:res.data.data
                })
                console.log(this.state.news)
            }
        })
    }

    render() {
        const {id,title,con} = this.state.news;
        return (
            <div className="detailBox">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >新闻详情</NavBar>
                <div style={{padding:'10px'}}>
                    <h1 style={this.state.titleStyle}>{title}</h1>
                    <p style={this.state.conStyle}>{con}</p>
                </div>
            </div>
        )
    }
}

export default Detail;