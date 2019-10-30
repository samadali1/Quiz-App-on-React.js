import React, { Component } from 'react';

export default class Result extends React.Component{
    render(){
        return(
            <div className={"quiz"} style={{textAlign:'center'}}>
                {this.props.result === "passed" ? <p style={{color:"#00817A",fontSize:'20px',fontFamily:"Oswald"}}><i class='fa fa-check' style={{color:"white"}}></i> <br /> CONGRATULATIONS! YOU ARE PASSED</p>: <p style={{color:"red",fontSize:'20px'}}><i class='fa fa-close' style={{color:"white"}}></i> <br /> SORRY! YOU ARE FAILED</p>}
                <p className={"line"}></p>
                <div className={"resultBox"} >
                    <div><p>Your Score</p><hr /><p style={{color:"white",fontFamily:"Oswald"}}>{this.props.obtMarks}%</p></div>

                    <div><p>Passing Score</p><hr /><p style={{color:"white",fontFamily:"Oswald"}}>50%</p></div>

                    <div><p>Correct Answers</p><hr /><p style={{color:"white",fontFamily:"Oswald"}}>{this.props.cAnswers}</p></div>

                    <div><p>Time Taken</p><hr /><p style={{color:"white",fontFamily:"Oswald"}}>{this.props.timeTaken.min} : {this.props.timeTaken.sec}</p></div>
                </div>
                <hr style={{width:"90%"}} />
                <button onClick={()=>{window.location.reload()}} className={'startAgainBtn'}><i class="fa fa-try" aria-hidden="true"></i> Try Again</button>
            </div>
        )
    }
}