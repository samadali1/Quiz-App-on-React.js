import React, { Component } from 'react';

export default class Quiz extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected:false,
            incorrect: props.incorrect,
            correct: props.correct,
            choosed:"",
            os : [false,false,false,false]
        }
    }
    calculateAns(e,index){
        const {os} = this.state;
        for(var i = 0; i<os.length; i++){
            os[i] = false;
        }
        os[index] = true;
        this.setState({selected:true, choosed: e.target.value, os: os})
    }
    static getDerivedStateFromProps(nextProps,nextState){
        return{
            incorrect:nextProps.incorrect,
            correct:nextProps.correct
        }
    }
    final(){
        const {correct,choosed,os} = this.state;
        for(var i = 0; i<os.length; i++){
            os[i] = false;
        }
        this.setState({
            selected:false,
            os:os
        })
        if(choosed!==""){
            if(correct===choosed){
                this.props.parrentFinal("correct")
            }
            else{
                this.props.parrentFinal("uncorrect")
            }
        }
    }
    
    render(){
        const {incorrect,correct,os} =this.state;
        return(
            <div className={"quiz"}>
            <small style={{color:'white'}}><span style={{color:'red'}}>Note </span> : Please select any option first to reach at next question.</small>
                <hr />
                <p className={'category'}><i class="fa fa-list-alt" style={{color:"white"}} aria-hidden="true"></i> Category : <span style={{color:"white"}}>{this.props.category}</span> </p>
                <p className={'otherHeads'} ><i class="fa fa-level-up" style={{color:"white"}} aria-hidden="true"></i> Difficulty : <span style={{color:"white"}}>{this.props.dificulty}</span></p>
                <p className={'otherHeads'} ><i class="fa fa-venus" style={{color:"white"}} aria-hidden="true"></i> Type : <span style={{color:"white"}}>{this.props.type}</span></p>
                <p className={"line"}></p>
                <div className={'quizBox'}>
                    <p>Q{this.props.qNo} : {this.props.question} </p>
                    <div>
                        {incorrect.map((v,i)=>{
                            return <div><label><input value={v} type='radio' name={"optQ" + this.props.qNo} checked={os[i]} onChange={(e)=>{this.calculateAns(e,i)}} />{v}</label><br /></div>
                        })}
                        <div><label><input value={this.state.correct} type='radio' name={"optQ" + this.props.qNo} checked={os[os.length-1]} onChange={(e)=>{this.calculateAns(e,os.length-1)}} />{this.state.correct}</label><br /></div>
                    </div>
                    {this.state.selected && <p className={'nextBtn'}><button onClick={()=>{this.final()}}> Next <i class='fa fa-arrow-right'></i></button></p>}
                    {!this.state.selected && <p className={'nextBtn'}><button style={{backgroundColor:'white',color:"grey"}}> Next <i class='fa fa-arrow-right'></i></button></p>}
                </div>
            </div>
        )
    }
}
