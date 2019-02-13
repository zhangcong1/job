import React from 'react';
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types';
class HeadSelect extends React.Component{
    static PropTypes = {
        HeadSelect:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={
            head:""
        }
    }
    render(){
        const HeadIcon = "001,002,003,004,007,008,009,010".split(',').map(v=>({
            text:v,
            icon:require(`./img/${v}.jpg`)
        }))
        return (
            <div>
                {this.state.head ? <div>你选择的头像是<img width={40} src={this.state.head} alt=""/></div> : <div>你还没有择头像</div> }
                <Grid data={HeadIcon} onClick={
                    (ele)=>{
                        this.setState({
                            head:ele.icon
                        })
                        this.props.HeadSelect(ele.icon)
                    }
                }/>
            </div>
        )
    }
}
export default HeadSelect;