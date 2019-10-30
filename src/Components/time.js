import React, { Component } from 'react';

export default class Time extends React.Component{
    constructor(){
        super()
        this.state = {
            minute:0,
            second:1
        }
    }
    componentDidMount(){
        var {minute,second} = this.state;
        this.props.time(second,minute)

        setInterval(()=>{
            second++;
            if(second>59){
                second= 0;
                minute = minute+1
            }
            this.setState({second: second, minute:minute})
        },1000)
    }
    componentWillUnmount(){
        this.props.time(this.state.second,this.state.minute)
    }
    
    render(){
        return(
            <p className={'time'}><i class='fa fa-clock-o' style={{color:"#019078"}}></i> {this.state.minute} : {this.state.second }</p>
        )
    }
}